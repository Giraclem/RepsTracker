class ExerciseList{

    constructor(){
        this.list = [];
        this.length = 0;
    }

    get(exerciseId){
        return this.list.find(ex=>ex.id==exerciseId);
    }

    load(){
        const list = JSON.parse(localStorage.getItem("exerciseList"))
        if(list){
            this.list = list;
            this.length = this.list.length;
        }
    }

    save(){
        localStorage.setItem("exerciseList",JSON.stringify(this.list));
    }

    add(exercise){
        this.list.push(exercise);
        this.length+=1;
    }

    remove(exercise){
        this.list = this.list.filter((ex)=>ex.id!=exercise.id);
        this.length-=1;
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

    swap_with_next(ex_id){
        const ex = this.get(ex_id);
        const idx = this.getIndex(ex_id);

        if (idx == -1) return 

        const idx2 = idx + 1;

        if (idx2 >= this.list.length) return

        this.list[idx] = this.list[idx2];
        this.list[idx2] = ex;
    }

    swap_with_previous(ex_id){

        const ex = this.get(ex_id);
        const idx = this.getIndex(ex_id);

        console.log(idx)
        if (idx == -1) return

        const idx2 = idx - 1;
        console.log(idx2)
        if (idx2 < 0) return

        this.list[idx] = this.list[idx2];
        this.list[idx2] = ex;
    }

}

export const exerciseList = new ExerciseList();

export const exLimitsValue = {
    nameLength : {min : 0 ,  max: 40},
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