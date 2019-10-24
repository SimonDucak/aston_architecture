<template>
  <div class="home">
    <h3>{{insurerPerson.firstName}}</h3>
    <label for="firstName">On keypress</label>
    <input id="firstName" placeholder="First name" v-store-model="insurerPerson.firstName" show-validators="blur">
    <err-group
      v-show="dirty.some(item => item === 'insurerPerson.firstName')"
      name="err-group"
      :value="insurerPerson.firstName"
      :validators="[
        {
          validatorName: 'required',
          message: 'Meno je povinný údaj',
        },
        {
          validatorName: 'minMaxString',
          params: { min: 3, max: 8 },
          message: 'Min. počet znakov je 3 a max. 8',
        },
      ]"
    />
    <button @click="$store.commit('insurerPerson/SET_FIRST_NAME', '')">Remove firstName</button>

    <h3>{{insurerPerson.lastName}}</h3>
    <label for="lastName">On blur</label>
    <input id="lastName" placeholder="Last name" v-store-model="insurerPerson.lastName" commit-on="blur">
    <err-group
      name="err-group"
      :value="insurerPerson.lastName"
      :validators="[
        {
          validatorName: 'required',
          message: 'Priezvisko je povinný údaj',
        },
        {
          validatorName: 'minMaxString',
          params: { min: 3, max: 8 },
          message: 'Min. počet znakov je 3 a max. 8',
        },
      ]"
    />
    <button @click="$store.commit('insurerPerson/SET_LAST_NAME', '')">Remove lastName</button>
  </div>
</template>

<script>
import ErrGroup from "../components/ErrGroup";
import { componentValidatorsMixin } from "../mixins";
import Err from "../components/Err";

export default {
  mixins: [
    componentValidatorsMixin()
  ],
  components: {
    Err,
    ErrGroup,
  },
  data() {
    return {
      dirty: [],
    };
  },
  name: 'home',
  computed: {
    insurerPerson() {
      return this.$store.state.insurerPerson;
    },
  },
}
</script>
