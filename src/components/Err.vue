<template>
  <li v-if="!valid">
    <slot></slot>
  </li>
</template>

<script>
  import Validators from "../validators";

  export default {
    name: "err",
    props: [
      "validatorName",
      "value",
      "name",
      "params",
    ],
    data() {
      return {
        valid: false,
      }
    },
    methods: {
      validate() {
        if (this.params) {
          this.valid = !!Validators[this.validatorName](this.value, this.params);
        } else {
          this.valid = !!Validators[this.validatorName](this.value);
        }
      }
    },
    mounted() {
      this.validate();
    },
    watch: {
      value() {
        this.validate();
      }
    }
  }
</script>

<style scoped>

</style>
