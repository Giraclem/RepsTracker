class ExerciseList{

    constructor(){
        this.list = []
    }

    get(exerciseId){
        return this.list.find(ex=>ex.id==exerciseId);
    }

    load(){
        const list = JSON.parse(localStorage.getItem("exerciseList"))
        if(list){
            this.list = list;
        }
    }

    save(){
        localStorage.setItem("exerciseList",JSON.stringify(this.list));
    }

    add(exercise){
        this.list.push(exercise);
    }

    remove(exercise){
        this.list = this.list.filter((ex)=>ex.id!=exercise.id);
    }

    getIndex(ex_id){
        const ex = this.get(ex_id)
        return this.list.indexOf(ex)
    }

    replace(prev_ex,new_ex){
        const id = prev_ex.id;
        new_ex.id = id;
        this.list[this.getIndex(id)] = new_ex;  
    }

    swap(ex_id1, ex_id2){
        const ex1 = this.get(ex_id1);
        const idx1 = this.getIndex(ex_id1);
        const ex2 = this.get(ex_id2);
        const idx2 = this.getIndex(ex_id2);

        if (idx1 == -1 || idx2 == -1){
            return
        }
        
        this.list[idx2] = ex1;
        this.list[idx1] = ex2;
    }

}

export const exerciseList = new ExerciseList();

export const exLimitsValue = {
    nameLength : {min : 0 ,  max: 20},
    series : {min : 0 ,  max: 999},
    repetitions : {min : 0 ,  max: 999},
    weight : {min : 0 ,  max: 999},
    weight_unit : ["kg","kgx2","lbs","lbsx2"],
    recup_time : {min : 0 ,  max: 3600},
    recup_time_unit : ["sec","min","hrs"]
}

export class Exercise{
    
    constructor(){
        this.id = "Ex_" + Date.now() + Math.random(10000);
        this.name = "";
        this.series = 0;
        this.repetitions = 0;
        this.weight = 0;
        this.weight_unit = "kg";
        this.recup_time = 0;
        this.recup_time_unit = "sec";
        this.muscles = [];
        this.tips = "";
        this.img_src="";
        this.vid_src="";
    }

    isCorrect(){
        return exLimitsValue.nameLength.max > this.name.length && this.name.length>exLimitsValue.nameLength.min &&
            exLimitsValue.series.max > this.series && this.series>exLimitsValue.series.min &&
            exLimitsValue.repetitions.max > this.repetitions && this.repetitions>exLimitsValue.repetitions.min &&
            exLimitsValue.weight.max > this.weight && this.weight>exLimitsValue.weight.min &&
            exLimitsValue.weight_unit.includes(this.weight_unit) &&
            exLimitsValue.recup_time.max > this.recup_time && this.recup_time>exLimitsValue.recup_time.min &&
            exLimitsValue.recup_time_unit.includes(this.recup_time_unit)
    }

    from(object){
        this.name = object.name;
        this.series =object.series;
        this.repetitions = object.repetitions;
        this.weight = object.weight;
        this.weight_unit = object.weight_unit;
        this.recup_time = object.recup_time;
        this.recup_time_unit = object.recup_time_unit
        this.muscles = object.muscles;
        this.tips = object.tips;
        this.img_src=object.img_src;
        this.vid_src=object.vid_src;
    }

}