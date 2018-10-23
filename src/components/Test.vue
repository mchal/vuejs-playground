<template>
    <div :id="'test_'+id" class="test">
        <h1 style="" :class="{red: isRed}">
            This is a test: {{ text + " | " + counter + " | " + blah }}
        </h1>
        <p>
            <input @click="startInterval" @focus="startInterval" @blur="stopInterval" v-model="text" />
        </p>
    </div>
</template>

<script>

    export default {
        name: "test",
        props: {
            id: Number,
            blah: String
        },
        mounted() {
            if(this.$parent.isInterval) {
                this.startInterval();
            }
        },
        data: function() {
            return {
                "timer": false,
                "counter": 0,
                "text": "default value",
                "aaa": "",
            }
        },
        methods: {
            startInterval: function() {
                if (!this.timer && !this.$parent.stopAllCounter) {
                    this.timer = setInterval(() => {
                        this.counter++;
                    }, 70);
                }
            },
            stopInterval: function() {
                clearInterval(this.timer);
                this.timer = false;
            }
        },
        computed: {
            "isRed": function() { return this.counter%5 === 0;}
        },

    }

</script>

<style scoped>
    .test {
        /*display: inline-flex;*/
        margin: 10px;
        width: 200px;
    }
    .test input {display: block;}

    .test .red {
        color: red
    }
</style>

