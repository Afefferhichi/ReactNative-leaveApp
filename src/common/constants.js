const constants = {
  DEMO_MODE: true,

  DATE_FORMAT: "ddd, MMM Do YYYY",

  HALF_DAY: {
    BEFORE_NOON: "MATIN",
    AFTER_NOON: "APRES_MIDI"
  },

  CongeState: {
    APPROVED: "APPROVED",
    PENDING: "PENDING",
    REFUSED: "REFUSED"
  },

  SortieState: {
    APPROVED: "APPROVED",
    PENDING: "PENDING",
    REFUSED: "REFUSED"
  },

  SortieTime: {
    HALF_HOUR: "HALF_HOUR",
    ONE_HOUR: "ONE_HOUR",
    ONE_AND_HALF_HOUR: "ONE_AND_HALF_HOUR",
    TWO_HOURS: "TWO_HOURS"
  },

  LeaveReson: {
    PERSONNEL: "Personnel",
    EXCEPTIONNEL: "Exceptionnel",
    MATERNITE: "Maternite",
    HALF_DAY: "Half_daY"
  },

  USER: { login: "Mahdi.Turki", password: "123" }, // normal user,
  MANAGER: { login: "Sameh.Ouederni", password: "123aze" } // manager,
};

export { constants };
