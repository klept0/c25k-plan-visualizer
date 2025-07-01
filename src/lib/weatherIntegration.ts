export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  feelsLike: number;
}

export interface WorkoutRecommendation {
  recommended: boolean;
  message: string;
  adjustments: string[];
  riskLevel: 'low' | 'medium' | 'high';
  alternativeTime?: string;
}

const WEATHER_API_KEY = process.env.VITE_OPENWEATHER_API_KEY || '';

export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherData | null> => {
  if (!WEATHER_API_KEY) {
    console.warn('OpenWeather API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      feelsLike: Math.round(data.main.feels_like)
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const getLocationWeather = async (city: string): Promise<WeatherData | null> => {
  if (!WEATHER_API_KEY) {
    console.warn('OpenWeather API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      feelsLike: Math.round(data.main.feels_like)
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const generateWorkoutRecommendation = (
  weather: WeatherData,
  userAge: number,
  hasHypertension: boolean = false
): WorkoutRecommendation => {
  const { temperature, condition, humidity, windSpeed, feelsLike } = weather;
  
  let recommended = true;
  let message = "Great weather for your workout!";
  const adjustments: string[] = [];
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  let alternativeTime: string | undefined;

  // Temperature considerations
  if (feelsLike < -5) {
    recommended = false;
    message = "Too cold for safe outdoor running";
    riskLevel = 'high';
    adjustments.push("Consider indoor alternatives like treadmill or bodyweight exercises");
  } else if (feelsLike < 5) {
    message = "Cold weather - dress warmly";
    riskLevel = 'medium';
    adjustments.push("Wear layers and cover extremities");
    adjustments.push("Extended warmup recommended");
  } else if (feelsLike > 35) {
    if (hasHypertension || userAge > 60) {
      recommended = false;
      message = "Too hot for safe exercise given your health profile";
      riskLevel = 'high';
      alternativeTime = "early morning or evening";
    } else {
      message = "Very hot - exercise with caution";
      riskLevel = 'high';
      adjustments.push("Exercise early morning or late evening");
      adjustments.push("Increase hydration significantly");
      adjustments.push("Take frequent breaks");
    }
  } else if (feelsLike > 30) {
    message = "Hot weather - stay hydrated";
    riskLevel = 'medium';
    adjustments.push("Bring extra water");
    adjustments.push("Consider earlier or later workout times");
    if (hasHypertension) {
      adjustments.push("Monitor how you feel closely");
    }
  }

  // Humidity considerations
  if (humidity > 80 && temperature > 25) {
    riskLevel = riskLevel === 'low' ? 'medium' : 'high';
    adjustments.push("High humidity increases perceived temperature");
    adjustments.push("Reduce intensity and take more breaks");
  }

  // Wind considerations
  if (windSpeed > 10) {
    adjustments.push("Strong winds - choose sheltered routes");
    if (temperature < 10) {
      adjustments.push("Wind chill will make it feel colder");
    }
  }

  // Weather condition considerations
  switch (condition.toLowerCase()) {
    case 'rain':
    case 'drizzle':
      message = "Rainy weather - indoor workout recommended";
      riskLevel = 'medium';
      adjustments.push("Slippery surfaces increase injury risk");
      adjustments.push("Consider treadmill or indoor alternatives");
      break;
    
    case 'thunderstorm':
      recommended = false;
      message = "Thunderstorm - unsafe for outdoor exercise";
      riskLevel = 'high';
      adjustments.push("Wait for weather to clear");
      adjustments.push("Indoor workout strongly recommended");
      break;
    
    case 'snow':
      message = "Snowy conditions - exercise with caution";
      riskLevel = 'medium';
      adjustments.push("Wear appropriate footwear with good traction");
      adjustments.push("Choose well-maintained paths");
      adjustments.push("Reduce pace to avoid slipping");
      break;
    
    case 'fog':
    case 'mist':
      adjustments.push("Reduced visibility - stay on familiar routes");
      adjustments.push("Wear bright or reflective clothing");
      break;
  }

  // Age-specific adjustments
  if (userAge > 65) {
    if (feelsLike < 10 || feelsLike > 25) {
      riskLevel = riskLevel === 'low' ? 'medium' : 'high';
      adjustments.push("Older adults are more sensitive to temperature extremes");
    }
  }

  // Hypertension-specific adjustments
  if (hasHypertension) {
    if (feelsLike > 28 || feelsLike < 0) {
      riskLevel = riskLevel === 'low' ? 'medium' : 'high';
      adjustments.push("Temperature extremes can affect blood pressure");
      adjustments.push("Monitor how you feel during exercise");
    }
  }

  return {
    recommended,
    message,
    adjustments: [...new Set(adjustments)], // Remove duplicates
    riskLevel,
    alternativeTime
  };
};

export const getWeatherIcon = (iconCode: string): string => {
  const iconMap: { [key: string]: string } = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };
  
  return iconMap[iconCode] || '🌤️';
};

export const requestLocationPermission = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

export const saveWeatherPreferences = (preferences: {
  enableWeather: boolean;
  defaultLocation?: string;
  autoLocation: boolean;
}): void => {
  localStorage.setItem('c25k_weather_preferences', JSON.stringify(preferences));
};

export const getWeatherPreferences = (): {
  enableWeather: boolean;
  defaultLocation?: string;
  autoLocation: boolean;
} => {
  const saved = localStorage.getItem('c25k_weather_preferences');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Error parsing weather preferences:', error);
    }
  }
  
  return {
    enableWeather: false,
    autoLocation: false
  };
};