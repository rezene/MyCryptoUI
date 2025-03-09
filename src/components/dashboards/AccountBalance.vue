<template>
    <v-card elevation="10" class="withbg">
      <v-card-item>
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">BTC Balance</v-card-title>
          <v-btn size="small" icon class="bg-error" @click="openModal">
            <v-avatar size="20" class="text-surface">
              <CurrencyDollarIcon size="20" />
            </v-avatar>
            <v-tooltip activator="parent" location="bottom">Buy BTC</v-tooltip>
          </v-btn>
        </div>
        <v-row>
          <v-col cols="12">
            <div class="mt-2">
              <h3 class="text-h4">{{ balance }} (Sats)</h3>
              <div class="mt-2">
                <v-avatar class="bg-lighterror text-accent" size="20">
                  <ArrowDownRightIcon class="text-error" size="15" />
                </v-avatar>
                <span class="text-subtitle-1 ml-2 font-weight-bold">USD</span>
                <span class="text-subtitle-1 text-muted ml-2">{{ usdValue }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="mt-3">
        <apexchart type="area" height="60" :options="areachartOptions" :series="areaChart.series"></apexchart>
      </div>
    </v-card>
  
    <!-- Popup Dialog -->
    <v-dialog v-model="isModalOpen" max-width="500">
      <v-card>
       
        <v-card-title>
          Transfer BTC
          <v-spacer></v-spacer>
          <v-btn icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="formData.address"
              label="BTC Address"
              outlined
              required
            ></v-text-field>
  

            <v-text-field
              v-model="formData.amount"
              label="Amount (Sats)"
              type="number"
              outlined
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeModal">Cancel</v-btn>
          <v-btn color="primary" @click="submitForm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useTheme } from 'vuetify';
  import axios from 'axios';
  
  const theme = useTheme();
  const indigo = theme.current.value.colors.indigo;
  
  const isModalOpen = ref(false);
  
  // Form data
  const formData = ref({
    address: '',
    amount: '',
  });
  
  const openModal = () => {
    isModalOpen.value = true;
  };
  
  const closeModal = () => {
    isModalOpen.value = false;
    formData.value = { address: '', amount: '' };
  };
  

  const submitForm = async () => {
  if (formData.value.address && formData.value.amount) {
    let response;
    try {
      
       response = await axios.post('http://localhost:3545/wallet/transfer', {
        entropy: localStorage.getItem('tokenEntropy'),
        role:localStorage.getItem("selectedRole"),
        address:formData.value.address,
        amount:formData.value.amount
          
      });
    } catch {
      alert("Some problem is happening");
    }
    closeModal();
   
  } else {
    alert('Please fill out all fields.');
  }
};
  
  const balance = ref(0);
  const usdValue = ref(0);
  
  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:3545/wallet/balance', {
        entropy: localStorage.getItem('tokenEntropy'),
        role:localStorage.getItem("selectedRole"),
      });
      balance.value = response.data.balance; 
      usdValue.value = (response.data.balance * 96000) / 1e8; 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  onMounted(async () => {
    await fetchData();
  });
  
  /* Chart */
  const areachartOptions = computed(() => {
    return {
      chart: {
        id: 'sparkline3',
        type: 'area',
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
      },
      series: [
        {
          name: 'Earnings',
          color: '#8763da',
          data: [25, 66, 20, 40, 12, 58, 20],
        },
      ],
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#f3feff'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: true,
          position: 'right',
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
        data: [25, 66, 20, 40, 12, 58, 20],
      },
    ],
  };
  </script>
  
  <style scoped>
  .withbg {
    background-color: #ffffff; 
  }
  </style>