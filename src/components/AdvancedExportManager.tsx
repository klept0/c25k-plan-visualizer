import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Calendar, 
  FileSpreadsheet, 
  FileText, 
  Code, 
  Loader2,
  CheckCircle,
  AlertCircle,
  QrCode,
  Cloud,
  Activity,
  FileImage,
  Smartphone
} from 'lucide-react';
import { UserProfile, WorkoutSession } from '@/types/user';
import { useUserProfile } from '@/hooks/useUserProfile';
import { generatePlanQR, generateWeekQR, generateProgressQR, downloadQRCode } from '@/lib/qrCodeGenerator';
import { getCurrentWeather, getLocationWeather, generateWorkoutRecommendation } from '@/lib/weatherIntegration';
import { 
  exportToStrava, 
  exportToGarmin, 
  exportToIntervals, 
  exportToAppleHealth,
  exportToGoogleFit,
  exportToRunKeeper,
  downloadFitnessExport,
  FitnessExportData
} from '@/lib/fitnessIntegrations';

interface AdvancedExportManagerProps {
  userProfile: UserProfile;
  workoutSessions: WorkoutSession[];
  currentWeek: number;
}

const AdvancedExportManager: React.FC<AdvancedExportManagerProps> = ({ 
  userProfile, 
  workoutSessions,
  currentWeek 
}) => {
  const { exportTrainingPlan, getExportFormats } = useUserProfile();
  const [availableFormats, setAvailableFormats] = useState<Record<string, string>>({});
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // QR Code states
  const [qrCodes, setQrCodes] = useState<{
    plan?: string;
    week?: string;
    progress?: string;
  }>({});
  const [generatingQR, setGeneratingQR] = useState(false);

  // Weather states
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherLocation, setWeatherLocation] = useState('');
  const [loadingWeather, setLoadingWeather] = useState(false);

  // Fitness platform states
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [exportingToFitness, setExportingToFitness] = useState(false);

  // PDF options
  const [pdfOptions, setPdfOptions] = useState({
    includeQR: true,
    includeWeather: true,
    includeProgress: true,
    includeNotes: true
  });

  useEffect(() => {
    loadExportFormats();
    generateAllQRCodes();
  }, []);

  const loadExportFormats = async () => {
    try {
      const formats = await getExportFormats();
      setAvailableFormats(formats);
    } catch (error) {
      console.error('Failed to load export formats:', error);
    }
  };

  const generateAllQRCodes = async () => {
    setGeneratingQR(true);
    try {
             const [planQR, weekQR, progressQR] = await Promise.all([
         generatePlanQR(userProfile),
         generateWeekQR({ 
           week: currentWeek, 
           title: `Week ${currentWeek}`, 
           description: '', 
           workouts: [],
           focus: '',
           safety_reminder: ''
         }, userProfile),
         generateProgressQR(userProfile, 27, workoutSessions.length, currentWeek)
       ]);

      setQrCodes({
        plan: planQR,
        week: weekQR,
        progress: progressQR
      });
    } catch (error) {
      console.error('Error generating QR codes:', error);
    } finally {
      setGeneratingQR(false);
    }
  };

  const loadWeatherData = async () => {
    setLoadingWeather(true);
    try {
      let weather;
      if (weatherLocation) {
        weather = await getLocationWeather(weatherLocation);
      } else {
        // Try to get current location weather
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        weather = await getCurrentWeather(position.coords.latitude, position.coords.longitude);
      }
      
      if (weather) {
        const recommendation = generateWorkoutRecommendation(
          weather, 
          userProfile.age, 
          userProfile.medicalConditions.includes('hypertension')
        );
        setWeatherData({ ...weather, recommendation });
      }
    } catch (error) {
      console.error('Error loading weather:', error);
      setWeatherData(null);
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleStandardExport = async (format: string) => {
    setExportingFormat(format);
    setExportStatus({ type: null, message: '' });

    try {
      await exportTrainingPlan(format, userProfile);
      setExportStatus({
        type: 'success',
        message: `Successfully exported your C25K plan as ${format.toUpperCase()}!`
      });
    } catch (error) {
      setExportStatus({
        type: 'error',
        message: `Failed to export: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setExportingFormat(null);
    }
  };

  const handleFitnessExport = async () => {
    if (selectedPlatforms.length === 0) {
      setExportStatus({
        type: 'error',
        message: 'Please select at least one fitness platform'
      });
      return;
    }

    setExportingToFitness(true);
    setExportStatus({ type: null, message: '' });

    try {
      const exportPromises = selectedPlatforms.map(async (platform) => {
        let exportData: FitnessExportData;
        
        switch (platform) {
          case 'strava':
            exportData = await exportToStrava(workoutSessions[0], userProfile);
            break;
          case 'garmin':
            exportData = await exportToGarmin(workoutSessions[0], userProfile);
            break;
          case 'intervals':
            exportData = await exportToIntervals(workoutSessions[0], userProfile);
            break;
          case 'applehealth':
            exportData = await exportToAppleHealth(workoutSessions, userProfile);
            break;
          case 'googlefit':
            exportData = await exportToGoogleFit(workoutSessions, userProfile);
            break;
          case 'runkeeper':
            exportData = await exportToRunKeeper(workoutSessions, userProfile);
            break;
          default:
            throw new Error(`Unsupported platform: ${platform}`);
        }
        
        downloadFitnessExport(exportData);
        return exportData;
      });

      await Promise.all(exportPromises);
      
      setExportStatus({
        type: 'success',
        message: `Successfully exported to ${selectedPlatforms.join(', ')}!`
      });
    } catch (error) {
      setExportStatus({
        type: 'error',
        message: `Failed to export to fitness platforms: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setExportingToFitness(false);
    }
  };

  const handleQRDownload = (type: 'plan' | 'week' | 'progress') => {
    const qrCode = qrCodes[type];
    if (qrCode) {
      downloadQRCode(qrCode, `c25k-${type}-qr`);
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'ics':
        return <Calendar className="h-4 w-4" />;
      case 'csv':
        return <FileSpreadsheet className="h-4 w-4" />;
      case 'json':
        return <Code className="h-4 w-4" />;
      case 'markdown':
        return <FileText className="h-4 w-4" />;
      case 'pdf':
        return <FileImage className="h-4 w-4" />;
      default:
        return <Download className="h-4 w-4" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'strava':
      case 'garmin':
      case 'intervals':
      case 'runkeeper':
        return <Activity className="h-4 w-4" />;
      case 'applehealth':
      case 'googlefit':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Download className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Advanced Export Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        {exportStatus.type && (
          <Alert className={exportStatus.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'} style={{ marginBottom: '1rem' }}>
            <div className="flex items-center gap-2">
              {exportStatus.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={exportStatus.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}>
                {exportStatus.message}
              </AlertDescription>
            </div>
          </Alert>
        )}

        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="fitness">Fitness Apps</TabsTrigger>
            <TabsTrigger value="qr">QR Codes</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(availableFormats).map(([format, description]) => (
                <div key={format} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFormatIcon(format)}
                      <h3 className="font-semibold text-sm uppercase">{format}</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {format === 'ics' ? 'Calendar' : 
                       format === 'csv' ? 'Spreadsheet' :
                       format === 'json' ? 'Data' : 'Document'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {description}
                  </p>
                  
                  <Button
                    onClick={() => handleStandardExport(format)}
                    disabled={exportingFormat !== null}
                    className="w-full"
                    variant="outline"
                    size="sm"
                  >
                    {exportingFormat === format ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="h-3 w-3 mr-2" />
                        Export {format.toUpperCase()}
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fitness" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Select Fitness Platforms</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'strava', name: 'Strava', description: 'Social fitness tracking' },
                    { id: 'garmin', name: 'Garmin Connect', description: 'Garmin device sync' },
                    { id: 'intervals', name: 'Intervals.icu', description: 'Advanced training analysis' },
                    { id: 'applehealth', name: 'Apple Health', description: 'iOS health integration' },
                    { id: 'googlefit', name: 'Google Fit', description: 'Android health platform' },
                    { id: 'runkeeper', name: 'RunKeeper', description: 'Running tracker' }
                  ].map((platform) => (
                    <div key={platform.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={platform.id}
                        checked={selectedPlatforms.includes(platform.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPlatforms([...selectedPlatforms, platform.id]);
                          } else {
                            setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.id));
                          }
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(platform.id)}
                          <Label htmlFor={platform.id} className="font-medium">{platform.name}</Label>
                        </div>
                        <p className="text-xs text-gray-500">{platform.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleFitnessExport}
                disabled={exportingToFitness || selectedPlatforms.length === 0}
                className="w-full"
              >
                {exportingToFitness ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Exporting to Platforms...
                  </>
                ) : (
                  <>
                    <Activity className="h-4 w-4 mr-2" />
                    Export to Selected Platforms ({selectedPlatforms.length})
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="qr" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">QR Code Generation</h3>
                <Button
                  onClick={generateAllQRCodes}
                  disabled={generatingQR}
                  variant="outline"
                  size="sm"
                >
                  {generatingQR ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="h-4 w-4 mr-2" />
                      Regenerate All
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { type: 'plan' as const, title: 'Training Plan', description: 'Complete C25K program details' },
                  { type: 'week' as const, title: 'Current Week', description: `Week ${currentWeek} workouts` },
                  { type: 'progress' as const, title: 'Progress Share', description: 'Your training progress' }
                ].map((qr) => (
                  <div key={qr.type} className="border rounded-lg p-4 text-center space-y-3">
                    <h4 className="font-medium">{qr.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{qr.description}</p>
                    
                    {qrCodes[qr.type] ? (
                      <div className="space-y-3">
                        <img 
                          src={qrCodes[qr.type]} 
                          alt={`${qr.title} QR Code`}
                          className="mx-auto border rounded"
                          style={{ maxWidth: '150px' }}
                        />
                        <Button
                          onClick={() => handleQRDownload(qr.type)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Download className="h-3 w-3 mr-2" />
                          Download
                        </Button>
                      </div>
                    ) : (
                      <div className="h-32 flex items-center justify-center text-gray-400">
                        QR Code not available
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Enter city name (optional)"
                  value={weatherLocation}
                  onChange={(e) => setWeatherLocation(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={loadWeatherData}
                  disabled={loadingWeather}
                  variant="outline"
                >
                  {loadingWeather ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Cloud className="h-4 w-4 mr-2" />
                      Get Weather
                    </>
                  )}
                </Button>
              </div>

              {weatherData && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Current Weather</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {weatherData.temperature}°C, {weatherData.description}
                          </p>
                        </div>
                        <span className="text-3xl">{weatherData.icon}</span>
                      </div>

                      <div className={`p-3 rounded-lg border ${
                        weatherData.recommendation.riskLevel === 'low' ? 'bg-green-50 border-green-200 dark:bg-green-900/20' :
                        weatherData.recommendation.riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20' :
                        'bg-red-50 border-red-200 dark:bg-red-900/20'
                      }`}>
                        <h5 className="font-medium mb-2">Workout Recommendation</h5>
                        <p className="text-sm mb-2">{weatherData.recommendation.message}</p>
                        {weatherData.recommendation.adjustments.length > 0 && (
                          <ul className="text-sm space-y-1">
                            {weatherData.recommendation.adjustments.map((adjustment: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500">•</span>
                                {adjustment}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedExportManager;