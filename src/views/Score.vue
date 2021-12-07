<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="success">
        <ion-buttons slot="start">
                <ion-back-button defaultHref="/jouer"></ion-back-button>
              </ion-buttons>
        <ion-title> Score</ion-title>
      </ion-toolbar>
    </ion-header>


     
      <ion-content>
 

  <ion-grid class="ion-text-center">

    <ion-row  >
      <ion-col>
        <ion-title>
          <ion-text >
            Les Milleures Scores
          </ion-text>
        </ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ab">
      <ion-col>
        <ion-text>Joueur</ion-text>
      </ion-col>

      <ion-col>
        <ion-text>Score</ion-text>
      </ion-col>

      <ion-col>
        <ion-text>Temps/s</ion-text>
      </ion-col>
    </ion-row>


    <ion-row v-for="joueur in joueurs" :key="joueur.id">
      <ion-col>
        <ion-text>
            {{joueur.nom}}
        </ion-text>
      </ion-col>

        <ion-col>
          <ion-text>
            {{joueur.score}}
          </ion-text>
        </ion-col>
  
        <ion-col>
          <ion-text>
            {{joueur.time}}
          </ion-text>
        </ion-col>
    </ion-row>

  </ion-grid>
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
  toastController,
 IonBackButton,
  IonCol,
 alertController
} from "@ionic/vue";
import { defineComponent } from "vue";
import axios from 'axios'
export default defineComponent({
  data() {
    return {
      joueurs: [],
      NbrChercher: 0,
      NbrProposer: 0,
      nbrTentatives: 0,
      message: "",
      score: 0,
      nom: "",
    };
  },
  methods: {
  
    getProducts() {
      axios.get("http://localhost:3000/joueurs").then((response) => {
        this.joueurs = response.data;
      });
    },
  },
  created() {
    
    axios.get('http://localhost:3000/joueurs?_sort=score,time&_order=desc,asc') 
      .then((res) => (this.joueurs = res.data));
  },
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
 IonBackButton
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
.ab{background-color: aqua;}
</style>
