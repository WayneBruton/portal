import { ref } from "vue";

// Create a global variables object
const urlPython = ref("");

if (process.env.DEV) {
  urlPython.value = "http://localhost:8000";
} else {
  urlPython.value = "https://omh-python.herokuapp.com";
}

// Export the global variables object for use in other components
export default urlPython;
