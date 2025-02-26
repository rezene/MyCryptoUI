<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const checkbox = ref(false);
const username = ref('');
const password = ref('');
const selectedRole= ref('Binary Seed');
const roles= ref(['Binary Seed', 'Entropy', 'Seed Phrase','xPriv']);
const router = useRouter();

const login = async () => {
    try {
        const response = await axios.post('http://localhost:3545/wallet/derived-address', {
                entropy: password.value,
                role:selectedRole.value,
        });

        if (response.status==200){
        localStorage.setItem('tokenEntropy', password.value);
        localStorage.setItem('selectedRole', selectedRole.value);
        router.push('/'); 
        } else alert("Please insert valid username and password");
    } catch (error) {
        console.error('Login failed:', error);
    }
};
</script>

<template>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100">Keep securing your account</span>
        </div>
    </div>
    <div>
        <v-row class="mb-3">
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Username</v-label>
                <v-text-field 
                    variant="outlined" 
                    class="pwdInput" 
                    hide-details 
                    color="primary" 
                    v-model="username" 
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Password</v-label>
                <v-text-field 
                    variant="outlined" 
                    class="border-borderColor" 
                    type="password" 
                    hide-details 
                    color="primary" 
                    v-model="password" 
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-select
                    :items="roles" 
                    label="MYP Role" 
                    v-model="selectedRole" 
                    variant="outlined" 
                    hide-details 
                    color="primary"
                ></v-select>
            </v-col>
            <v-col cols="12" class="py-0">
                <div class="d-flex flex-wrap align-center w-100 ">
                    <v-checkbox hide-details color="primary">
                        <template v-slot:label class="">Remember this Device</template>
                    </v-checkbox>
                </div>
            </v-col>
            <v-col cols="12">
                <v-btn 
                    size="large" 
                    rounded="pill" 
                    color="primary" 
                    class="rounded-pill" 
                    block 
                    @click="login" >
                    Sign In
                </v-btn>
            </v-col>
        </v-row>
    </div>

</template>
 
<style>
/* Your styles here */
</style>