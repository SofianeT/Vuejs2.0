export default {
  name: "TaskCard",
  props: {
    title: String,
    description: String,
    completed: Boolean,
    createdAt: Date,
    modifiedAt: Date || null,
    deleteTodo: Function,
    dialogEditTodo: Function,
    changeCompleted: Function, 
  },
  methods: {
    formatDate(date) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    },
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      const time = hours + "h :" + minutes + "min :" + seconds + "s";
      return time;
    },
    isDateInLastFourDays(date) {
      // On récupère la date actuelle
      const now = new Date();
      
      // On calcule la différence en millisecondes entre la date passée en paramètre et la date actuelle
      const diffMs = now.getTime() - date.getTime();
      
      // On calcule le nombre de jours correspondant à cette différence
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      
      // On retourne vrai si la différence est inférieure ou égale à 4 jours
      return diffDays >= 4;
    }
    
  },
};
