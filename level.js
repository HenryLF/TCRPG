function LevelGenerator(n){
    for(let i =0;i<n;i++){
        let m = new Monster(5, 4, 0);
        monster_div.appendChild(m.div);
    }
}