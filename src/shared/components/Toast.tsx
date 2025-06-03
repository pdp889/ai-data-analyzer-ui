import React from 'react';
import { Toaster } from 'react-hot-toast';
import { TOAST_CONFIG } from '../constants/toast.constants';

export const Toast = (): JSX.Element => <Toaster {...TOAST_CONFIG} />;
