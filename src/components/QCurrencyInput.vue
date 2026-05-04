<template>
  <q-input
    ref="inputRef"
    :error-message="errorMessage"
    :error="!!errorMessage"
    v-model="formattedValue"
    outlined
    label="Amount"
  />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { computed, watch } from "vue";

export default {
  name: "QCurrencyInput",
  props: {
    modelValue: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef, formattedValue, numberValue, setValue } = useCurrencyInput(
      props.options
    );

    const errorMessage = computed(() =>
      numberValue.value < 0 ? "Value must not be less than 0" : undefined
    );

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );

    return { inputRef, formattedValue, errorMessage };
  },
};
</script>
