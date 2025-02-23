<script setup lang="ts">
import {  onMounted } from "vue";
import { useRouter } from "vue-router"; // Import useRouter for navigation
import ProfitExpanse from "@/components/dashboards/ProfitExpense.vue";
import TrafficDistribution from "@/components/dashboards/AccountBalance.vue";
import ProductSales from "@/components/dashboards/ReceivingAddress.vue";
import UpcommingSchedule from "@/components/dashboards/TransactionHistory.vue";
import TopPayingClients from "@/components/dashboards/MarketCapital.vue";
import ProductCards from "@/components/dashboards/ProductCards.vue";

const router = useRouter(); // Initialize the router

// Check for token on component mount
onMounted(() => {
    const token = localStorage.getItem('tokenEntropy'); // Get the token from local storage
    if (!token) {
        router.push('/auth/login'); // Redirect to login if token is not set
    }
});
</script>

<template>
    <v-row>
        <v-col cols="12" sm="12" lg="8">
            <ProfitExpanse />
        </v-col>
        <v-col cols="12" sm="12" lg="4">
            <div class="mb-6">
                <TrafficDistribution/>
            </div>
            <div>
                <ProductSales/>
            </div>
        </v-col>
        <v-col cols="12" sm="12" lg="4">
            <UpcommingSchedule/>
        </v-col>
        <v-col cols="12" sm="12" lg="8">
            <TopPayingClients/>
        </v-col>
        <v-col cols="12" sm="12" lg="12">
            <ProductCards/>
        </v-col>
        <v-col class="text-center mt-2">
            <p class="text-muted">Design and Developed by <a flat variant="text" href="" target="_blank" class="pl-1 text-primary">MyCrypto Team</a></p>
        </v-col>
    </v-row>
</template>

<style>
/* Your styles here */
</style>