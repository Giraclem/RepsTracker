class sessionHistory{

    constructor(){

        this.sessionsList = []

    }

    add( historyEntry ){

        if (!("sessionName" in historyEntry) || !("exerciseDone" in historyEntry) ){
            return
        }

        const pastSession = {

            id : "pastSession_" + Date.now() + Math.random(10000),
            sessionName : historyEntry.sessionName,
            date : Date.now(),
            exerciseDone : historyEntry.exerciseDone

        };

        this.sessionsList.push(pastSession);
    }

    save(){
        localStorage.setItem("sessionHistory",JSON.stringify(this.sessionsList));
    }

    load(){
        const history = JSON.parse(localStorage.getItem("sessionHistory"));
        if (history){
            this.sessionsList = history;
        }
    }

    delete( pastSessionId ){
        this.sessionsList= this.sessionsList.filter((pastSession)=>pastSession.id!=pastSessionId);
    }

    clear(){
        this.sessionsList=[];
    }

    getNthLastSeries(exerciseId, n){
        const result = [];
        const sortedList = this.sessionsList.slice().sort((sess1, sess2) => sess2.date - sess1.date)  //.slice() for creating a copy
        for (const session of sortedList) {
            for (const exercise of session.exerciseDone) {
                if (exercise.exerciseId !== exerciseId) continue;
                for (const serie of exercise.series) {
                    result.push(serie);
                    if (result.length === n) {
                        return result;
                    }
                }
            }
        }
        return result;
    }
}

export const pastSessionHistory = new sessionHistory();