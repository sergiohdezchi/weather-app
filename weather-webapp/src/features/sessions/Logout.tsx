import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store';
import { logoutUser } from './sessionSlice';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refreshToken = useSelector((state : RootState) => state.session.accessToken);

  useEffect(() => {
    if (refreshToken){
      dispatch(logoutUser(refreshToken));
    }
    navigate('/login');
  }, []);

  return (
    <div>Logout</div>
  )
}

export default Logout