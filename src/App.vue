<template>
  <v-app>
    <app-header>
    </app-header>
    <v-content>
      <router-view/>
    </v-content>
    <app-footer></app-footer>

  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
export default {

  components: {
    AppHeader,
    AppFooter,
  }
}

</script>
<style>
  .theBody{
    margin: 0;
    padding: 0;
  }
  .box{
    height: 100vh;
    
  }
  .box::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f00;
    opacity: 0.7;
    mix-blend-mode: color;
    pointer-events: none;
  }
  h1{
    margin: 0;
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    color: white;
    font-size: 5em;
    font-family: sans-serif;
    letter-spacing: 0.2em;
    
   
  }
  video{
     height: 100vh;
     width: 100%;
     object-fit: cover;
  }
  h1 span{
    opacity: 0;
    display: inline-block;
    animation: animate 1s linear forwards;
  }
  @keyframes animate{
    0%{
      opacity: 0;
      transform: rotateY(90deg);
      filter: blur(10px);
    }
    100%{
      opacity: 1;
      transform: rotateY(0deg);
      filter: blur(0);
    }
  }

  h1 span:nth-child(1)
  {
    animation-delay: 0.5s;
  }

  h1 span:nth-child(2){
    animation-delay: 0.75s;
  }

  h1 span:nth-child(3){
    animation-delay: 1s;
  }

  h1 span:nth-child(4){
    animation-delay: 1.5s;
  }

  h1 span:nth-child(5){
    animation-delay: 1.75s;
  }

  h1 span:nth-child(6){
    animation-delay: 2s;
  }

  h1 span:nth-child(7){
    animation-delay: 2.5s;
  }

  h1 span:nth-child(8){
    animation-delay: 2.75s;
  }

  h1 span:nth-child(9){
    animation-delay: 3s;
  }

  h1 span:nth-child(10){
    animation-delay: 3.5s;
  }

  h1 span:nth-child(11){
    animation-delay: 3.75s;
  }
  
  h1 span:nth-child(12){
    animation-delay: 4s;
  }
</style>>