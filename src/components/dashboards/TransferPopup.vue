<script setup lang="ts">
import { ref } from 'vue';
import { productsCard } from '@/data/dashboard/dashboardData';

const isModalOpen = ref(false);

// Form data
const formData = ref({
  address: '',
  amount: '',
});

// Function to open the modal
const openModal = () => {
  isModalOpen.value = true;
};

// Function to close the modal
const closeModal = () => {
  isModalOpen.value = false;
  // Reset form data when closing the modal
  formData.value = { address: '', amount: '' };
};

// Function to handle form submission
const submitForm = () => {
  if (formData.value.address && formData.value.amount) {
    alert(`Form submitted!\nAddress: ${formData.value.address}\nAmount: ${formData.value.amount}`);
    closeModal();
  } else {
    alert('Please fill out all fields.');
  }
};
</script>

<template>
  <v-row>
    <v-col cols="12" lg="3" sm="6" v-for="card in productsCard" :key="card.title">
      <v-card elevation="10" class="withbg">
        <RouterLink :to="card.link">
          <v-img :src="card.photo" height="100%" class="rounded-t-md"></v-img>
        </RouterLink>
        <div class="d-flex justify-end mr-4 mt-n5">
          <!-- Buy Button -->
          <v-btn size="30" icon class="bg-primary d-flex" @click="openModal">
            <v-avatar size="20" class="text-surface">
              <BasketIcon size="15" />
            </v-avatar>
            <v-tooltip activator="parent" location="bottom">Buy</v-tooltip>
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>

  <!-- Popup Dialog -->
  <v-dialog v-model="isModalOpen" max-width="500">
    <v-card>
      <!-- Dialog Title -->
      <v-card-title>
        Buy Product
        <v-spacer></v-spacer>
        <v-btn icon @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Dialog Content -->
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <!-- Address Input -->
          <v-text-field
            v-model="formData.address"
            label="Address"
            outlined
            required
          ></v-text-field>

          <!-- Amount Input -->
          <v-text-field
            v-model="formData.amount"
            label="Amount"
            type="number"
            outlined
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <!-- Dialog Actions -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeModal">Cancel</v-btn>
        <v-btn color="primary" @click="submitForm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.withbg {
  background-color: #ffffff; /* Adjust background color as needed */
}
</style>