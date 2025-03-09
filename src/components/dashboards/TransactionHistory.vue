<script setup lang="ts">
import { CircleIcon } from 'vue-tabler-icons';
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Transaction {
    confirmed: string;         
    block_time: number;       
    value: number;            
    type: string;             
}

const transactions = ref<Transaction[]>([]);
const fetchData = async () => {
   
    try {
        const response = await axios.post('http://localhost:3545/wallet/transactions', {
            entropy: localStorage.getItem("tokenEntropy"),
            role: localStorage.getItem("selectedRole"),
        });

        transactions.value = response.data; 
      
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

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
    color: green; 
}

.text-internal {
    color: red; 
}
}
</style>