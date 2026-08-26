
// Exercises
import { exerciseList,Exercise } from "../Scripts/exerciseStorage.js";
exerciseList.load();

export const loadDefaultExercise = async () => {
    try {
        const response = await fetch("../Scripts/sampleExercises.json");
        const defaultEx = await response.json();
        defaultEx.forEach((ex)=>{
            const newEx = new Exercise();
            for (const prop in ex){
                    newEx[prop] = ex[prop];
                }
                exerciseList.add(newEx);
        });
        exerciseList.save();
    } catch {
        return false
    }
    return true
}


import {Session} from "../Scripts/sessionsStorage.js";
import {ExercisePool} from "../Scripts/sessionsStorage.js";
import { sessionsList } from "../Scripts/sessionsStorage.js";
sessionsList.load();

export const loadDefaultSessions = () => {
    try {
        let pools = [
        { 
            name: "Chest", 
            ids: [
            "default_ex_1",  // Développé couché
            "default_ex_24", // Supine press (Matrix)
            "default_ex_25", // Chest press (Machine basic fit)
            "default_ex_26"  // Dips assist (Machine basic fit)
            ] 
        },
        { 
            name: "Back 1", // Tirages verticaux
            ids: [
            "default_ex_30", // Lat pulldown (Matrix)
            "default_ex_31", // Lat pulldown (Machine basic fit)
            "default_ex_32"  // Assisted chin
            ] 
        },
        { 
            name: "Back 2", // Tirages horizontaux (Rowings)
            ids: [
            "default_ex_18", // Rowing Bûcheron
            "default_ex_33", // Seated row (Matrix)
            "default_ex_34"  // Seated row (Machine basic fit)
            ] 
        },
        { 
            name: "Shoulder", 
            ids: [
            "default_ex_13", // Élévations Latérales
            "default_ex_27", // Shoulder press (Matrix)
            "default_ex_28", // Shoulder press (Machine basic fit)
            "default_ex_29"  // Développé militaire avec haltère
            ] 
        },
        { 
            name: "Triceps", 
            ids: [
            "default_ex_15", // Extension triceps poulie
            "default_ex_16", // Barre au front
            "default_ex_37"  // Extension triceps avec haltère
            ] 
        },
        { 
            name: "Biceps", 
            ids: [
            "default_ex_17", // Curl Marteau
            "default_ex_35", // Curl avec haltère
            "default_ex_36"  // Arm curl (Machine basic fit)
            ] 
        }
        ];
        
        let session = new Session;
        
        session.id = "default_session_1";
        session.name = "Upper body sessions";
        session.categories = ["Basic fit", "Upper body"];
        session.img_src = "../Image/devellopécouché.jpg"
        
        for (const p of pools){
            const pool = new ExercisePool(p.name);
            for (const exId of p.ids){
                const ex = exerciseList.get(exId);
                if (ex){
                    pool.add(exerciseList.get(exId));
                } else {
                    console.warn(`Exercise with id ${exId} does not exists!`);
                }
            }
            session.add(pool);
        }
        
        sessionsList.add(session);
        sessionsList.save();

        pools = [
        { 
            name: "Warm-up", 
            ids: [
            "default_ex_38",
            ] 
        },
        { 
            name: "Quadriceps",
            ids: [
                "default_ex_39"
            ] 
        },
        { 
            name: "Mollets",
            ids: [
            "default_ex_40"
            ] 
        },
        { 
            name: "Tronc", 
            ids: [
            "default_ex_41"
            ] 
        },
        { 
            name: "Isio", 
            ids: [
            "default_ex_42" // Extension triceps poulie
            ] 
        },
        { 
            name: "Abductors", 
            ids: [
            "default_ex_43"
            ] 
        },
        {
            name: "Upper body",
            ids: [
            "default_ex_44",
            "default_ex_24",
            "default_ex_1"
            ]
        }
        ];
        
        session = new Session;
        
        session.id = "default_session_2";
        session.name = "Renforcement course à pied";
        session.categories = ["Course à pied", "Lower body"];
        session.img_src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSafIAQCgXlUFnlphfJyJD6WtxtAklTjBf4b6g-TQfQa8tCe1Vt0aMfpz8&s=10"
        
        for (const p of pools){
            const pool = new ExercisePool(p.name);
            for (const exId of p.ids){
                const ex = exerciseList.get(exId);
                if (ex){
                    pool.add(exerciseList.get(exId));
                } else {
                    console.warn(`Exercise with id ${exId} does not exists!`);
                }
            }
            session.add(pool);
        }
        
        sessionsList.add(session);
        sessionsList.save();

        return true

    } catch {
        return false
    }
}
