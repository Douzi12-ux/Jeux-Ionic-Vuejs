<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="success">
          <ion-buttons slot="start">
                <ion-back-button defaultHref="/"></ion-back-button>
              </ion-buttons>
        <ion-title>Jeux {{ NbrChercher }} </ion-title>
       <ion-button slot="end" color="success" router-link="/score" >Scores</ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
     
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button color="warning" @Click="nouveau" v-on:click="countDownTimer">Nouveau</ion-button>
          </ion-col>
          <ion-col id="ff">
             <ion-label>Tentative dispo : {{5-nbrTentatives}} </ion-label><br/><br/>
             <ion-label>Temps : {{countDown}} s</ion-label>
          </ion-col>
        </ion-row>
        <ion-row v-if="NbrChercher!=0">
          <ion-col>
            <ion-item lines="full" >
              <ion-label position="floating"></ion-label>
              <ion-input
                type="text"
                name="test"
                v-model="NbrProposer"
                required
              ></ion-input>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-button expand="full" @click="teste()" v-on:click="nbrTentatives += 1" >OK</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>

      <div id="m" v-if="message == 'Félicitation'">
        {{ message }}
      </div>
      <div id="k" v-else >
        {{ message }}
      </div>
       
      <div v-if="message == 'Félicitation'">
        
        <p>Votre Score est {{ score }} point</p>
        <p>Votre Temps est {{ time }} second</p>
      
        <ion-item v-for="his in histor " :key="his">{{ his.message }}</ion-item>
        <ion-row>
          <ion-col>
              <form>
        <ion-item lines="full">
          <ion-label position="floating">Saisie Votre Nom</ion-label>
          <ion-input type="text" v-model="nom" required></ion-input>
        </ion-item>
         </form>
         
            <ion-button class="a" router-link="/home" v-on:click="add()" expand="full">Confirmer</ion-button>
          </ion-col>
        </ion-row>
        
      
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
IonButtons,
IonBackButton,
  IonInput,
  IonCol,
  IonButton,
  IonItem,alertController,IonLabel
} from "@ionic/vue";
import { defineComponent } from "vue";
import axios from 'axios'
export default defineComponent({
  data() {
    return {
      joueurs: [],
      count:1,
      NbrChercher: 0,
      NbrProposer: 0,
      nbrTentatives: 0,
      message: "",
      score: 0,
      nom: "",
      countDown : 0,
      time:0,
      histor:[{ message: '' }],
      
    };
  },
  methods: {

    
   add() {

      axios
        .post("http://localhost:3000/joueurs", {
          nom: this.nom,
          score:this.score,
          time:this.time
        })
        .then(async (response) => {
          const alert = await alertController.create({
        header: 'Félicitation Votre Score est Enregistrer',
        message: 'tu veux rejouer?',
        buttons: [ 'OK']
      });

      await alert.present();
              this.NbrChercher=0;
              this.nbrTentatives=0;
              this.message="";
              this.NbrProposer=0;
              this.countDown=0;
      })
        
    },
    countDownTimer() {
      if(this.countDown >= 0){
         setTimeout(() => {
                        this.countDown += 1
                        this.countDownTimer()
                    }, 1000)
           }
               
            },
    nouveau() {
      this.NbrChercher = Math.floor(Math.random() * (100 - 1)) + 1;
      console.log(this.NbrChercher);
    },
     async teste() {
      if ((this.NbrProposer > this.NbrChercher)&&((4-this.nbrTentatives)>0)) {
        this.message = "plus petit";
        this.histor.push({message:'Tentative '+this.count+' : '+this.NbrProposer+" "+this.message+""});
        this.count+=1;
      } else if ((this.NbrProposer < this.NbrChercher)&&((4-this.nbrTentatives)>0)) {
        this.message = "plus grand";
          this.histor.push({message:'Tentative '+this.count+' : '+this.NbrProposer+" "+this.message+""});
        this.count+=1;
      } else if((this.NbrProposer == this.NbrChercher)&&((4-this.nbrTentatives)>0)){
        this.message = "Félicitation";
        this.score = (5 - this.nbrTentatives + 1) * 10;
        this.time=this.countDown;
        this.histor.push({message:'Tentative '+this.count+' : '+this.NbrProposer+' Félicitation '});
         this.countDown=0;
        
      }else {
              const alert = await alertController.create({
        header: 'Perdu',
        message: 'tu veux rejouer?',
        buttons: [ 'OK']
      });

      await alert.present();
              this.NbrChercher=0;
              this.nbrTentatives=0;
              this.message="";
              this.NbrProposer=0;
              this.countDown=0;
      }
    },
    getProducts() {
      axios.get("http://localhost:3000/joueurs").then((response) => {
        this.joueurs = response.data;
      });
      
    },
  },
  created() {
    axios
      .get("http://localhost:3000/joueurs")
      .then((res) => (this.joueurs = res.data));
     

      
  },
  name: "Jouer",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,IonButtons,
IonBackButton,
  },
});

</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
#m{background-color:#8c8c8c;text-align: center;}
#k{text-align: center;}
#ff{background-color:#8c8c8c;text-align: center;}
</style>

