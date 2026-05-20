import { exerciseList } from "../Scripts/exerciseStorage.js";
import {pastSessionHistory} from "../Scripts/historyStorage.js";
pastSessionHistory.load()

export class Session{
    // Session is a list of exercise pool
    constructor(){
        this.id = "session_" + Date.now() + Math.random(10000),
        this.name ="",
        this.creationDate = Date.now(),
        this.categories = []
        this.img_src = "",

        this.pools = []
    }
    add(pool){
        this.pools.push(pool);
    }
    isCorrect(){
        return sessLimitsValue.nameLength.max > this.name.length && this.name.length>sessLimitsValue.nameLength.min &&
                this.categories.every(category => category.length<sessLimitsValue.categoryLength.max) &&
                this.pools.every(pool =>    sessLimitsValue.poolNameLength.max>pool.name.length && 
                                            sessLimitsValue.poolNameLength.min<pool.name.length && 
                                            sessLimitsValue.poolExercises.min<pool.exercisesId.length && 
                                            sessLimitsValue.poolExercises.max>pool.exercisesId.length)
    }
}

export const sessLimitsValue = {
    nameLength : {min : 0 ,  max: 20},
    categoryLength : {max:20},
    poolNameLength : {min:0,max:20},
    poolExercises : {min:0,max:5}
}


export class ExercisePool{
    // Pool is a list of exercises id
    constructor(name){
        this.id = "pool_" + Date.now() + Math.random(10000);
        this.name=name;
        this.exercisesId = [];
    }
    add(exercise){
        this.exercisesId.push(exercise.id);
    }
}

export class CurrentSession{
    constructor(session){
        if (!session){
            return;
        }
        this.id = "sess_" + Date.now() + Math.random(10000);
        this.originalSessionId = session.id;
        this.name = session.name;
        this.startDate = Date.now();
        this.endDate = 0;
        this.categories = session.categories;

        this.pools = session.pools.map(el=>{
            return {    id : el.id,
                        name: el.name,
                        statut : "PENDING",
                        exercises : el.exercisesId
                    }
        });
        
        this.history = {
            sessionName : this.name,
            exerciseDone : []
        }; // History of the series done

        this.current = {
            exercise : null,
            poolId : null,
            series : []
        };
    }

    save(){
        sessionStorage.setItem("currSession",JSON.stringify(this));
    }

    load(){
        const storedValue = JSON.parse(sessionStorage.getItem("currSession"));
        for (const prop in storedValue){
            this[prop] = storedValue[prop];
        }
    }

    // When we need to just consult data
    read(){
        const storedValue = JSON.parse(sessionStorage.getItem("currSession"));
        return storedValue
    }

    select(poolId, exerciseId){ // Optimize seach with binary search
        // Find the right pool
        for (const pool of this.pools){
            if (pool.id === poolId){
                // Find the right exercise
                for (const exId of pool.exercises){
                    if (exId == exerciseId){
                        this.current.exercise = exerciseList.get(exId);
                        this.current.poolId = pool.id;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    add_series(repetitions, weight, recoveryTime){
        this.current.series.push({ 
            repetitions : repetitions,
            weight: weight,
            recoveryTime : recoveryTime
        })
    }

    save_exercise(){
        const ex = { 
            exerciseId : this.current.exercise.id,
            exerciseName : this.current.exercise.name,
            weightUnit : this.current.exercise.weight_unit,
            series : this.current.series
        };
        this.history.exerciseDone.push(ex); 
    }

    validate_pool(){
        for (const pool of this.pools){
            if (pool.id == this.current.poolId){ 
                pool.statut = "COMPLETED";
                return;
            }
        }
    }

    clear_current_ex_data(){
        this.current = {
            exercise : null,
            poolId : null,
            series : []
        };
    }

    clear_session(){
        sessionStorage.removeItem("currSession");
    }

    finish_exercise(){
        this.save_exercise();
        this.validate_pool();
        this.clear_current_ex_data();
    }

    isSessionFinished(){
        return (this.pools.every(pool => pool.statut === "COMPLETED"))
    }

    saveSessionToHistory(){
        pastSessionHistory.add(this.history);
        pastSessionHistory.save();
    }

    finish_session(){
        this.saveSessionToHistory();
        this.clear_session();
    }
}

export const currSession = new CurrentSession();

class SessionsList {

    constructor(){
        this.list = [];
    }

    get(sessionId){
        return this.list.find(sess => sess.id == sessionId);
    }

    add(session){
        this.list.push(session);
    }

    save(){
        localStorage.setItem("sessionsList",JSON.stringify(this.list));
    }

    load(){
        const list = JSON.parse(localStorage.getItem("sessionsList"));
        if(list){
            this.list = list;
        }
    }

    remove(session){
        this.list = this.list.filter((sess)=>sess.id!=session.id);
    }

    replace(prev_sess,new_sess){
        const id = prev_sess.id;
        this.remove(prev_sess);
        new_sess.id = id;
        this.add(new_sess);
    }

}

export const sessionsList = new SessionsList();