const onLogout = async () => {
    localStorage.setItem('jwt', '');
    window.location.replace('/login');
};
