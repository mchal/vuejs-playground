<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="stopCounter">{{counterButton}}</button>
    <div class="tests">
      <!-- :key is needed when v-for is used -->
      <!-- :blah is part of props -->
      <!-- :id is part of props -->
      <!-- ref is needed to access it from App.vue using $refs -->
      <Test v-for="(l, index) in this.list" :key="index" :blah="l" :id="index" ref="test"/>
    </div>
  </div>
</template>

<script>
console.time('runtime');
import Test from '@/components/Test.vue'

export default {
    name: 'app',
    components: {
        Test
    },
    mounted() {
        const app=this;
        window.addEventListener("blur", app.pageBlur, false);
        window.addEventListener("focus", app.pageFocused, false);
        let timer = setInterval(function() {
            if (app.list.length < 15) {
                app.list.push('test');
            } else {
                clearInterval(timer);
            }
        }, 500);
    },
    data: function() {
        return {
            "list": ['@michal', '@someone', '@blah'],
            "isInterval": false,
            "stopAllCounter": false,
            "counterButton": "Disable counters!"
        }
    },
    methods: {
        stopCounter() {
            if(this.stopAllCounter) {
                this.counterButton = "Disable counter";
                this.stopAllCounter = false;
            } else {
                this.counterButton = "Enable counter";
                this.stopAllCounter = true;
            }
        },
        pageBlur() {
              let tests = this.$refs.test;

              for (let t = 0; t < tests.length; t++) {
                  tests[t].startInterval();
                  this.isInterval = true;
              }
        },
        pageFocused() {
              let tests = this.$refs.test;

              for (let t = 0; t < tests.length; t++) {
                  tests[t].stopInterval();
                  this.isInterval = false;
              }
        }
    }

}
console.timeEnd('runtime');
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@supports (display: grid) {
  .tests {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
