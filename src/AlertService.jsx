import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

class AlertService {


    // Show SweetAlert2 Alert (Optional)
    showCustomPopup(type, message) {
        Swal.fire({
            icon: type,
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
            },
        });
    }
}

// Export an instance of the service
export const alertService = new AlertService();

// Export ToastContainer to be used in your app
export const AlertContainer = () => (
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
);