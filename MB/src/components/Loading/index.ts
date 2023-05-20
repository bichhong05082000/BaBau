import LoadingManager from 'components/Loading/loadingManager';

export function showLoading(): void {
    const ref = LoadingManager.getDefault();
    if (ref) {
        ref.show();
    }
}

export function hideLoading(): void {
    const ref = LoadingManager.getDefault();
    if (ref) {
        ref.hide();
    }
}
