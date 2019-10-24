<template>
  <ul class="err-group">
    <err
      v-for="(validator, index) in validators"
      :key="index"
      name="err"
      :validatorName="validator.validatorName"
      :value="value"
      :params="validator.params ? validator.params : false"
    >{{validator.message}}</err>
  </ul>
</template>

<script>
  import Err from "../components/Err";
  import { componentValidatorsMixin } from "../mixins";

  export default {
    mixins: [
      componentValidatorsMixin("err", "valid"),
    ],
    props: [
      "value",
      "validators",
      "name",
    ],
    components: {
      Err,
    },
    name: "errGroup",
    mounted() {
      // console.log(this.validators);
    }
  }
</script>

<style lang="scss" scoped></style>
