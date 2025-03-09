<template>
    <v-card elevation="10" class="withbg">
        <v-card-item>
            <div class="d-flex align-center justify-space-between pt-sm-2">
                <v-card-title class="text-h5">Receiving Account</v-card-title>
                <v-btn size="small" icon class="bg-error">
                    <v-avatar size="20" class="text-surface">
                        <HomeIcon size="20" />
                    </v-avatar>
                </v-btn>
            </div>

            <v-row>
                <v-col cols="12">
                    <div class="mt-2">
                        <div><span class="text-subtitle-1 ml-2 font-weight-bold">Account</span></div>
                        <div class="mt-2">
                            <v-avatar class="bg-lighterror text-accent" size="20">
                                <ArrowDownRightIcon class="text-error" size="15" />
                            </v-avatar>
                            <h5 class="text-h6">{{ derivedAddress }} </h5>

                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row v-if="role === 'Entropy' || role ==='Seed Phrase'">
                <v-col cols="12">
                    <div class="mt-2">
                        <div>
                            <span class="text-subtitle-1 ml-2 font-weight-bold">Mnemonics</span>
                        </div>
                        <div class="mt-2">
                            <v-avatar class="bg-lighterror text-accent" size="20">
                                <ArrowDownRightIcon class="text-error" size="15" />
                            </v-avatar>
                            <h7 v-if="role === 'Entropy'" class="text-h6">{{ mnemonics }} </h7>
                            <h7 v-if="role === 'Seed Phrase'" class="text-h6"> {{ entropy }}</h7>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card-item>

    </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import axios from 'axios';

const theme = useTheme();
const indigo = theme.current.value.colors.indigo;

// State for API data

const derivedAddress = ref();
const mnemonics = ref();
const entropy = localStorage.getItem("tokenEntropy");
const role = localStorage.getItem("selectedRole");

// Fetch data from API
const fetchData = async () => {

    try {


        const res = await axios.post('http://localhost:3545/wallet/derived-address', {
            entropy: entropy,
            role: role,

        });

        derivedAddress.value = res.data.derivedAddress;

        if (role == "Entropy") {
            const res = await axios.post('http://localhost:3545/wallet/mnemonics', {
                entropy: entropy,
                role: role,
            });
            mnemonics.value = res.data.mnemonics;

        }



    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Call fetchData on component mount
onMounted(async () => {
    await fetchData();
});

/* Chart */
const areachartOptions = computed(() => {
    return {
        chart: {
            id: "sparkline3",
            type: "area",
            height: 60,
            sparkline: {
                enabled: true,
            },
            group: "sparklines",
            fontFamily: 'inherit',
            foreColor: "#adb0bb",
        },
        series: [
            {
                name: "Earnings",
                color: "#8763da",
                data: [25, 66, 20, 40, 12, 58, 20],
            },
        ],
        stroke: {
            curve: "smooth",
            width: 2,
        },
        fill: {
            colors: ["#f3feff"],
            type: "solid",
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            theme: "dark",
            fixed: {
                enabled: true,
                position: "right",
            },
            x: {
                show: false,
            },
        },
    };
});

const areaChart = {
    series: [
        {
            name: '',
            data: [25, 66, 20, 40, 12, 58, 20]
        }
    ]
};
</script>

<style>
/* Your styles here */
</style>