import { LoadingModalRef } from 'components/Loading/LoadingModal';

class LoadingManager {
    private _defaultLoading: LoadingModalRef | null = null;

    public register(_ref: LoadingModalRef): void {
        if (!this._defaultLoading) {
            this._defaultLoading = _ref;
        }
    }

    public unregister(_ref: LoadingModalRef) {
        if (this._defaultLoading) {
            this._defaultLoading = null;
        }
    }

    public getDefault() {
        return this._defaultLoading;
    }
}

export default new LoadingManager();
