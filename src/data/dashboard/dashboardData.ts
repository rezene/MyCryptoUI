import type { recentTrans, productPerformanceType, productsCards } from '@/types/dashboard/index';

/*--Recent Transaction--*/
const recentTransaction: recentTrans[] = [
    {
        title: '09:30 am',
        subtitle: 'Payment received from John Doe of $385.90',
        textcolor: 'primary',
        boldtext: false,
        line: true,
        link: '',
        url: ''
    },
    {
        title: '10:00 am',
        subtitle: 'New sale recorded',
        textcolor: 'secondary',
        boldtext: true,
        line: true,
        link: '#ML-3467',
        url: ''
    },
    {
        title: '12:00 am',
        subtitle: 'Payment was made of $64.95 to Michael',
        textcolor: 'success',
        boldtext: false,
        line: true,
        link: '',
        url: ''
    },
    {
        title: '09:30 am',
        subtitle: 'New sale recorded',
        textcolor: 'warning',
        boldtext: true,
        line: true,
        link: '#ML-3467',
        url: ''
    },
    {
        title: '09:30 am',
        subtitle: 'New arrival recorded',
        textcolor: 'error',
        boldtext: true,
        line: true,
        link: '',
        url: ''
    },
    {
        title: '12:00 am',
        subtitle: 'Payment Received',
        textcolor: 'success',
        boldtext: false,
        line: false,
        link: '',
        url: ''
    },
]

/*Basic Table 1*/
const productPerformance: productPerformanceType[] = [
    {
        id: 1,
        name: 'Bitcoin',
        post: 'BTC',
        status: 'Growing',
        statuscolor: 'success',
        budget: '~$1 Trillion'
    },
    {
        id: 2,
        name: 'Ethereum',
        post: 'ETH',
        status: ' Growing',
        statuscolor: 'success',
        budget: '~$500 Billion'
    },
    {
        id: 3,
        name: 'Binance Chain',
        post: 'BNB',
        status: 'Growing',
        statuscolor: 'primary',
        budget: '~$100 Billion'
    },
    {
        id: 4,
        name: 'XRP Ledger',
        post: 'XRP',
        status: 'Growing',
        statuscolor: 'primary',
        budget: '~$50 Billion'
    },
    {
        id: 5,
        name: 'Cardano',
        post: 'ADA',
        status: 'Growing',
        statuscolor: 'indigo',
        budget: '~$20 Billion'
    },
    {
        id: 6,
        name: 'Solana',
        post: 'SOL',
        status: 'Growing',
        statuscolor: 'indigo',
        budget: '~$20 Billion'
    }

];

/*--Products Cards--*/
import proimg1 from '@/assets/images/products/btc.svg';
import proimg2 from '@/assets/images/products/eth.svg';
import proimg3 from '@/assets/images/products/bnb.svg';
import proimg4 from '@/assets/images/products/sol.png';
const productsCard: productsCards[] = [
    {
        title: 'BTC',
        link: '/',
        photo: proimg1,
        salesPrice: 95430,
        price: 95433.17,
        rating: 5
    },
    {
        title: 'ETH',
        link: '/',
        photo: proimg2,
        salesPrice: 2670,
        price: 2670.46,
        rating: 4
    },
    {
        title: 'BNB',
        link: '/',
        photo: proimg3,
        salesPrice: 640,
        price: 640.75,
        rating: 3
    },
    {
        title: 'SOL',
        link: '/',
        photo: proimg4,
        salesPrice: 167,
        price: 168.49,
        rating: 2
    }
];


export { recentTransaction, productPerformance, productsCard }