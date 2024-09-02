import axios from 'axios'

const Base_url =  'https://api.hirdayam.com/api'; // 'http://91.108.104.122/api';
   console.log(sessionStorage.getItem('authtoken'))
const Api = axios.create({
    baseURL: Base_url,
    headers: {
        'Accept': 'application/json',
        // Authorization: `Bearer ${sessionStorage.getItem('authtoken')}`
    }
});


Api.interceptors.request.use(config => {
    const token = sessionStorage.getItem('authtoken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
}, error => {
    return Promise.reject(error);
});
const ApiService = {
    // getSettingData: (key) => Api.get('get-setting-data',{params:{key}}),
        login : (data) => Api.post('login',data),
        userlist : (data) => Api.get('/userlist',{params:data}),
        createCategory : (data) => Api.post('createCategory',data),
        getCategory : () => Api.get('getCategory'),
        deleteCategory : (data) => Api.delete('deleteCategory',{data: data}),
        updateCategory : (data) => Api.put('updateCategory',data),
        createSubCategory : (data) => Api.post('createSubCategory',data),
        getSubCategory : () => Api.get('getSubCategory'),
        getProductDropdown : () =>Api.get('/getProductfordropdown'),
        createBanner : (data) => Api.post('/createBanner',data),
        getBannerList : () => Api.get('/getBannerList'),
        deleteBanner : (data) => Api.delete('/deleteBanner',{data: data}),
        editBanner : (data) =>   Api.post('/editBanner',data),
        getBottomBanner : () => Api.get('/getBottomBanner'),
        createBottomBanner : (data) => Api.post('/createBottomBanner',data),
        updateBottomBanner : (data) => Api.post('/updateBottomBanner',data),
        deleteBottomBanner : (data) => Api.delete('/deleteBottomBanner',{data:data}),
        getVideoBanner  :  () => Api.get('/getVideoBanner'),
        createVideoBanner : (data) => Api.post('/createVideoBanner',data),
        updateVideoBanner : (data) => Api.post('/editvideoBanner',data),
        deleteVideoBanner : (data) => Api.delete('/deleteVideoBanner',{data: data}),

};

export default ApiService;
