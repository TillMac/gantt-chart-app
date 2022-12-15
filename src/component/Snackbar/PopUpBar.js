import { CloseOutlined } from '@mui/icons-material';
import { Fade, IconButton, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePopUpBar } from '../../store/popUpBarInfoSlice';

const PopUpBar = () => {
	const popUpBarInfo = useSelector((state) => state.popUpBarInfo);
	const vertical = 'bottom';
	const horizontal = 'right';
	const dispatch = useDispatch();

	const closeBarHandler = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(closePopUpBar());
	};

	const action = (
		<React.Fragment>
			<IconButton size='small' color='inherit' onClick={closeBarHandler}>
				<CloseOutlined fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={popUpBarInfo.isOpen}
				autoHideDuration={6000}
				message={popUpBarInfo.msg}
				onClose={closeBarHandler}
				action={action}
				TransitionComponent={Fade}
			/>
		</>
	);
};

export default PopUpBar;
