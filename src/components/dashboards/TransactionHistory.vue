<script setup lang="ts">
import { CircleIcon } from 'vue-tabler-icons';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define the Transaction interface with the required properties
interface Transaction {
    confirmed: string;         // Confirmation status
    block_time: number;       // Block time
    value: number;            // Amount of the transaction
    type: string;             // Type of transaction (e.g., 'incoming', 'outgoing')
}

// State to hold the transaction data
const transactions = ref<Transaction[]>([]);

// Function to fetch transaction data
const fetchData = async () => {
   
    try {
        const response = await axios.post('http://localhost:3545/wallet/transactions', {
            entropy: localStorage.getItem("tokenEntropy"),
            role: localStorage.getItem("selectedRole"),
        });

        // Assuming response.data contains the transactions array
        transactions.value = response.data; // Assign the fetched data to the transactions ref
      
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Call fetchData on component mount
onMounted(async () => {
    await fetchData();
});
</script>

<template>
    <v-card elevation="10" class="withbg">
        <v-card-item class="pb-0">
            <v-card-title class="text-h5 pt-sm-2">Transaction History</v-card-title>
            <div class="recent-transaction mt-10 px-3">
                <div v-for="transaction in transactions" :key="transaction.block_time">
                    <v-row class="d-flex mb-4">
                        <v-col cols="6" lg="7" md="auto" sm="auto" class="px-0 pt-0 pb-1 d-flex align-start">
                            <h6 class="text-body-1 textSecondary text-no-wrap">{{ transaction.block_time }}</h6>
                        </v-col>
                        <v-col cols="1" sm="1" class="px-0 text-center pt-0 pb-1">
                            <CircleIcon size="16" :class="'text-' + transaction.type" />
                            <div v-if="true" class="line mx-auto bg-borderColor"></div>
                        </v-col>
                        <v-col cols="5" sm="4" class="pt-0">
    <h6 class="text-body-1">{{ transaction.value }}</h6>
    <div class="d-flex align-items-center">
        <h6 class="text-body-1 ms-2">{{ transaction.confirmed ? 'Confirmed' : 'Not Confirmed' }}</h6>
    </div>
</v-col>
                    </v-row>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>

<style lang="scss">
.recent-transaction {
    .line {
        width: 2px;
        height: 35px;
    }
    .text-external {
    color: green; /* Example color for incoming transactions */
}

.text-internal {
    color: red; /* Example color for outgoing transactions */
}
}
</style>