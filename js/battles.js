/* ============ battles.js — turn-based editorial combat ============ */

let battleRoundIdx = 0;

function runBattle(scene) {
  setPortrait(scene.enemy, scene.expression);
  if (scene.boss) {
    Sfx.danger();
    showSplash(scene.introText, "danger", scene.introHold || 2800)
      .then(() => beginBattle(scene));
  } else {
    beginBattle(scene);
  }
}

function beginBattle(scene) {
  battleRoundIdx = 0;
  battleShow(scene);
  showBattleRound(scene);
}

function showBattleRound(scene) {
  const round = scene.rounds[battleRoundIdx];
  battleRound(scene.rounds.length, battleRoundIdx + 1);
  battleComment(round.comment);
  battleOptions(round.options, (i) => battleChoose(scene, i));
}

function battleChoose(scene, index) {
  const option = scene.rounds[battleRoundIdx].options[index];
  state.decisions.push({ scene: state.sceneId + ":r" + battleRoundIdx, choice: option.text });

  const deltas = applyEffects(state, option.effects);
  if (typeof option.rel === "number" && state.relationships[scene.enemy] !== undefined) {
    state.relationships[scene.enemy] += option.rel;
  }
  if (option.countFlag) {
    state.flags[option.countFlag] = (state.flags[option.countFlag] || 0) + 1;
  }
  showStatDeltas(deltas);
  setStats(state.stats, state.coffeeConsumed);
  persist();

  battleReply(option.reply, () => {
    battleRoundIdx += 1;
    if (state.stats.patience <= 0) {
      battleHide();
      showSplash(scene.loseText || "STRESS OVERLOAD", "danger", 2200)
        .then(() => startScene(scene.onLose));
    } else if (battleRoundIdx >= scene.rounds.length) {
      battleHide();
      if (scene.wonFlag) state.flags[scene.wonFlag] = true;
      persist();
      showSplash(scene.winText || "REPORT SURVIVED", scene.winVariant || "success", 2200)
        .then(() => startScene(scene.onWin));
    } else {
      showBattleRound(scene);
    }
  });
}
