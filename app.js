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
            logMessages : [],
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
        },
        playerHealthShowInProgressBar() {
            if(this.playerHealth < 0) return '0%';

            return this.playerHealth + '%';
        },
        monsterHealthShowInProgressBar() {
            if(this.monsterHealth < 0) return '0%';

            return this.monsterHealth + '%';
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
            this.logMessages = [];
        },
        attackOnMonster(){
            const attackValue = getRandomNumber(5,12);
            this.monsterHealth -= attackValue;
            this.attackOnPlayer();
            this.currentRound++;
            this.addLogMessage('player', 'Attack', attackValue);
        },
        attackOnPlayer(){
            const attackValue = getRandomNumber(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'Attack', attackValue);
        },
        specialAttackOnMonster(){
            const attackValue = getRandomNumber(10,25);
            this.monsterHealth -= attackValue;
            this.attackOnPlayer();
            this.currentRound++;
            this.addLogMessage('player', 'Special Attack', attackValue);
        },
        healPlayer(){

            const healValue = getRandomNumber(8,20);

            if( this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }

            this.addLogMessage('player', 'heal', healValue);
            this.attackOnPlayer();
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMessage(who, what, value){

            this.logMessages.unshift({
                actionBy : who,
                actionType : what,
                actionValue : value,
            });
        }
    },
});

app.mount("#game");