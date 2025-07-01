import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  Calendar, 
  FileSpreadsheet, 
  FileText, 
  Code, 
  Loader2,
  CheckCircle,
  AlertCircle 
} from 'lucide-react';
import { UserProfile } from '@/types/user';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ExportManagerProps {
  userProfile: UserProfile;
}

const ExportManager: React.FC<ExportManagerProps> = ({ userProfile }) => {
  const { exportTrainingPlan, getExportFormats } = useUserProfile();
  const [availableFormats, setAvailableFormats] = useState<Record<string, string>>({});
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    loadExportFormats();
  }, []);

  const loadExportFormats = async () => {
    try {
      const formats = await getExportFormats();
      setAvailableFormats(formats);
    } catch (error) {
      console.error('Failed to load export formats:', error);
    }
  };

  const handleExport = async (format: string) => {
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
      default:
        return <Download className="h-4 w-4" />;
    }
  };

  const getFormatColor = (format: string) => {
    switch (format.toLowerCase()) {
      case 'ics':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'csv':
        return 'bg-green-500 hover:bg-green-600';
      case 'json':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'markdown':
        return 'bg-orange-500 hover:bg-orange-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Training Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {exportStatus.type && (
          <Alert className={exportStatus.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
            <div className="flex items-center gap-2">
              {exportStatus.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={exportStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {exportStatus.message}
              </AlertDescription>
            </div>
          </Alert>
        )}

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
              
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
              
              <Button
                onClick={() => handleExport(format)}
                disabled={exportingFormat !== null}
                className={`w-full text-white ${getFormatColor(format)}`}
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

        {Object.keys(availableFormats).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Loading export formats...
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📱 How to Use Your Exports</h4>
          <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <p><strong>📅 ICS:</strong> Import into Apple Calendar, Google Calendar, or Outlook</p>
            <p><strong>📊 CSV:</strong> Open with Excel, Google Sheets, or Numbers for tracking</p>
            <p><strong>🔗 JSON:</strong> Use with fitness apps or custom integrations</p>
            <p><strong>📄 Markdown:</strong> Print as a checklist or view in any text editor</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportManager;