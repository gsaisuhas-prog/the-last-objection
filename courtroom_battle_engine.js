/**
 * The Last Objection - Courtroom Battle & Cross-Examination Engine
 * Manages the turn-based Ace Attorney style trial confrontation between
 * Justin Vance (Judge's Son) and Kaizen Mercer (Prosecutor).
 */

export const battlePhases = [
  {
    phase: 1,
    tag: "PHASE 1 OF 4 · THE MURDER WEAPON",
    testimony: 'Kaizen: "Dr. Aris installed an iron tooth knowing Judge Vance had his annual MRI scheduled. It was deliberate medical murder!"',
    contradictionClues: ['dentist_invoice', 'mri_report'],
    pressDialogue: 'Justin: "Dr. Aris treated my father for 25 years with devotion! Why would he use iron?"\nKaizen: "Greed or malice, counsel! He ordered the materials!"',
    correctDialogue: 'OBJECTION!\nJustin: "Dr. Aris never ordered iron! Zurich Biomaterials records prove he ordered medical Palladium-100! The iron tooth was an alien substitution!"',
    kaizenBreakdownReaction: 'Kaizen: "T-Tch! So what if he ordered palladium? That doesn\'t prove someone else broke in!"'
  },
  {
    phase: 2,
    tag: "PHASE 2 OF 4 · THE SECURITY FOOTAGE",
    testimony: 'Kaizen: "An intruder? Preposterous! The clinic cameras operated all night. Nobody entered! Only Dr. Aris had physical access to the dental vault!"',
    contradictionClues: ['clinic_cctv', 'atm_footage'],
    pressDialogue: 'Justin: "Has digital forensics reviewed the raw clinic video feed?"\nKaizen: "The tape speaks for itself! No one entered the clinic premises that night!"',
    correctDialogue: 'OBJECTION!\nJustin: "The clinic DVR was hacked into a 4-minute continuous loop! And the bank ATM camera caught the burglar\'s black sedan (#7X-904) in the alley at 3:15 AM!"',
    kaizenBreakdownReaction: 'Kaizen: "N-No! The ATM camera was supposed to be offline... I mean, that plate proves nothing!"'
  },
  {
    phase: 3,
    tag: "PHASE 3 OF 4 · THE PHYSICAL IMPLANT",
    testimony: 'Kaizen: "Even if a phantom burglar broke into the clinic, where is the supposed palladium tooth? The dentist fabricated that entire story!"',
    contradictionClues: ['stolen_tooth'],
    pressDialogue: 'Justin: "If my father had palladium, it would not have reacted to the 3T magnet!"\nKaizen: "Because the dentist never installed palladium!"',
    correctDialogue: 'TAKE THAT!\nJustin: "Here is the real palladium crown! Stamped with Dr. Aris\'s serial #P-992, recovered from the burglar\'s safehouse!"',
    kaizenBreakdownReaction: 'Kaizen: "G-GAAAH! You found the strongbox?! That warehouse was supposed to be scrubbed clean!"'
  },
  {
    phase: 4,
    tag: "PHASE 4 OF 4 · THE TRUE MASTERMIND & MOTIVE",
    testimony: 'Kaizen: "A burglar stole it? Then prosecute the dead burglar! You have zero evidence linking ANYONE in this courtroom to that theft!"',
    contradictionClues: ['wire_receipt', 'mercer_dossier'],
    pressDialogue: 'Justin: "Who funded the burglar? An orphan thief doesn\'t execute complex bio-assassinations without a client!"\nKaizen: "That is pure speculation!"',
    correctDialogue: 'HOLD IT!\nJustin: "We found this $250,000 wire transfer slip from YOUR private legal escrow to the deceased burglar! Memo: \'Swap the tooth and vanish!\' And you poisoned him with cyanide! Your motive? My father ruined your career and disbarred you in State v. Mercer!"',
    kaizenBreakdownReaction: 'Kaizen: "CURSE YOU, VANCE! HE DESTROYED MY ENTIRE FUTURE! HE DESERVED TO DIE IN THAT SCANNER! I CRAFTED THE PERFECT MURDER... HOW COULD YOU PIECE IT TOGETHER?!"'
  }
];

export class CourtroomBattleEngine {
  constructor(onVictory, onDefeat) {
    this.currentPhaseIndex = 0;
    this.credibility = 100;
    this.onVictory = onVictory;
    this.onDefeat = onDefeat;
  }

  getCurrentPhase() {
    return battlePhases[this.currentPhaseIndex];
  }

  press() {
    return this.getCurrentPhase().pressDialogue;
  }

  presentEvidence(clueId) {
    const phase = this.getCurrentPhase();
    const isCorrect = phase.contradictionClues.includes(clueId);

    if (isCorrect) {
      const objectionText = phase.correctDialogue;
      const reactionText = phase.kaizenBreakdownReaction;
      this.currentPhaseIndex++;

      const isWon = this.currentPhaseIndex >= battlePhases.length;
      return {
        success: true,
        objectionText,
        reactionText,
        isWon
      };
    } else {
      this.credibility -= 25;
      const isLost = this.credibility <= 0;
      return {
        success: false,
        penaltyText: 'Chief Justice Sterling: "Counsel Vance! That evidence has no bearing on this claim!" (-25% Credibility)',
        credibility: this.credibility,
        isLost
      };
    }
  }
}
