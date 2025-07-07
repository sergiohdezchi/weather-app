import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, Card, CardContent, Container, FormControl, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, resetErrorState, UserLoginData } from "./sessionSlice";
import { RootState } from "../../store";
import { motion } from "framer-motion";
import CloudIcon from "@mui/icons-material/Cloud";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  let errorMessages = useSelector((state: RootState) => state.session.errorMessages);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loading = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef?.current?.focus();
    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      dispatch(resetErrorState());
    }
  }, [])


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);
    if (emailRef?.current === undefined
      || emailRef?.current?.value === ""
      || passwordRef?.current === undefined
      || passwordRef?.current?.value === "") {
      return setErrors(["Please fill out all fields"])
    }
    const payload = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value
    }
    const sanitizedPayload: UserLoginData = {
      email: payload.email || "",
      password: payload.password || "",
    };
    await dispatch<any>(loginUser(sanitizedPayload)).unwrap();
    if (errorMessages.length === 0) {
      navigate("/");
    } else {
      return setErrors(errorMessages);
    }
  }

  // Configuración para el input de contraseña ya se maneja directamente en el formulario

  return (
    <Box
      component="section"
      sx={{ 
        mt: 4,
        minHeight: 'calc(100vh - 200px)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card 
            sx={{ 
              boxShadow: 4, 
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, #1565c0 0%, #0288d1 100%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color: 'white'
            }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.2
                }}
              >
                <CloudIcon sx={{ fontSize: 60, mb: 1 }} />
              </motion.div>
              <Typography 
                variant="h4" 
                component="h1" 
                fontWeight="600" 
                textAlign="center"
                sx={{ textShadow: '0px 2px 4px rgba(0,0,0,0.2)' }}
              >
                ClimaSphere
              </Typography>
              <Typography variant="subtitle1" textAlign="center">
                Inicia sesión para acceder a la información del clima
              </Typography>
            </Box>
            <CardContent sx={{ p: 4 }}>
              {errors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert 
                    severity="error" 
                    aria-live="assertive"
                    sx={{ mb: 3 }}
                  >
                    {errors.map((error, index) => (
                      <Typography key={`alert-${index}`} variant="body2">{error}</Typography>
                    ))} 
                  </Alert>
                </motion.div>
              )}
              <form onSubmit={handleSubmit}>
                <FormGroup sx={{ mb: 3 }}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel required htmlFor="email" id="email-label">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      inputRef={emailRef}
                      label="Email"
                      sx={{ borderRadius: 2 }}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup sx={{ mb: 4 }}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel required htmlFor="password" id="password-label">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      inputRef={passwordRef}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      sx={{ borderRadius: 2 }}
                    />
                  </FormControl>
                </FormGroup>
                <Button 
                  disabled={loading} 
                  variant="contained" 
                  color="primary" 
                  type="submit" 
                  id="submit-button"
                  fullWidth
                  size="large"
                  sx={{ 
                    py: 1.2, 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                  component={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Iniciar Sesión
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Login
