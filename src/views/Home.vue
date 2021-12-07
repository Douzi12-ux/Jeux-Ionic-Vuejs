<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="success">
        <ion-title >Jeux </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
     
            <ion-button id="hg"  color="success" router-link="/jouer" >Jouer</ion-button>
            <ion-button id="hm"  color="primary" router-link="/score" >Consulter Les Milleures Scores</ion-button>
      
     
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
  IonButton,
  
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      
      
    };
  },
  methods: {
    
    
  },
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
   
    IonButton,

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
#hg{margin-left: 38%;margin-top: 50%;}
#hm{margin-left: 8%;margin-top: 10%;}

</style>

