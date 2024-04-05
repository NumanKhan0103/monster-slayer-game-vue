// we make a js function because we don't call in vue js template and we don't use Vue properties 
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner : null,
        }
    },
    computed: {
        monsterHealthBarStyle(){

            if(this.monsterHealth < 0) return {width: '0%'}

            return {width: this.monsterHealth + '%'};
        },
        playerHealthBarStyle(){

            if(this.playerHealth < 0) return {width: '0%'}

            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0
        }
    },
    watch:{
        playerHealth(value){
            if( value <= 0 && this.monsterHealth <= 0 ){
                // A draw
                this.winner = 'draw';
            }else if (value <= 0){
                // player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if( value <= 0 && this.playerHealth <= 0 ){
                // draw
                this.winner= 'draw';
            }else if (value <= 0 ){  
                // monster lost
                this.winner = 'player';
            }
        }
    },
    methods: {
        startGame(){
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
        },
        attackOnMonster(){
            const attackValue = getRandomNumber(5,12);
            this.monsterHealth -= attackValue;
            this.attackOnPlayer();
            this.currentRound++;
        },
        attackOnPlayer(){
            const attackValue = getRandomNumber(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttackOnMonster(){
            const attackValue = getRandomNumber(10,25);
            this.monsterHealth -= attackValue;
            this.attackOnPlayer();
            this.currentRound++;
        },
        healPlayer(){

            const healValue = getRandomNumber(8,20);

            if( this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }

            this.attackOnMonster();
        },
        surrender(){
            this.winner = 'monster';
        }
    },
});

app.mount("#game");