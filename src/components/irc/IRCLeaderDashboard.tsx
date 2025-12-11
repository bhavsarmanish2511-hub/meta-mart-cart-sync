import { useState } from 'react';
import { ircAlerts, IRCAlert } from '@/lib/ircAlertData';
import { AlertTriangle, Clock, MapPin, Server, DollarSign, Shield, Activity, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { IRCAlertDetail } from './IRCAlertDetail';

const severityStyles = {
  critical: 'bg-error/20 text-error border-error/30 animate-pulse',
  high: 'bg-muted/30 text-foreground border-border/50',
  medium: 'bg-muted/20 text-foreground border-border/30',
  low: 'bg-muted text-muted-foreground border-border',
};

const statusStyles = {
  active: 'bg-error text-error-foreground',
  investigating: 'bg-muted text-foreground',
  mitigating: 'bg-muted text-foreground',
  resolved: 'bg-muted text-foreground',
};

export function IRCLeaderDashboard() {
  const [selectedAlert, setSelectedAlert] = useState<IRCAlert | null>(null);

  if (selectedAlert) {
    return <IRCAlertDetail alert={selectedAlert} onBack={() => setSelectedAlert(null)} />;
  }

  const criticalCount = ircAlerts.filter(a => a.severity === 'critical').length;
  const activeCount = ircAlerts.filter(a => a.status === 'active').length;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2">
            <Shield className="h-6 w-6 text-muted-foreground" />
            IRC Leader Command Console
          </h1>
          <p className="text-sm text-muted-foreground">
            Incident Response Command Center - Real-time Alert Management
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-error/10 text-error border-error/20 text-xs px-2 py-0.5">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {criticalCount} Critical
          </Badge>
          <Badge variant="outline" className="bg-muted text-muted-foreground border-border text-xs px-2 py-0.5">
            <Activity className="h-3 w-3 mr-1" />
            {activeCount} Active
          </Badge>
          <Badge variant="outline" className="bg-muted text-muted-foreground border-border text-xs px-2 py-0.5">
            <Zap className="h-3 w-3 mr-1" />
            HELIOS Active
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-error/30 bg-error/5">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-error/20">
              <AlertTriangle className="h-5 w-5 text-error" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Critical Incidents</p>
              <p className="text-xl font-semibold text-error">{criticalCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-muted/30">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">MTTR Target</p>
              <p className="text-xl font-semibold">15 min</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-muted/30">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <Server className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Systems Affected</p>
              <p className="text-xl font-semibold">12</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-muted/30">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Revenue at Risk</p>
              <p className="text-xl font-semibold">$2.3M/hr</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert List */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-error" />
            Active Incidents - Click to Manage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {ircAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={cn(
                "p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg",
                severityStyles[alert.severity]
              )}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={cn(statusStyles[alert.status], "text-xs")}>
                      {alert.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={cn(
                      "uppercase text-xs",
                      alert.severity === 'critical' && "text-error border-error/30"
                    )}>
                      {alert.severity}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground">{alert.id}</span>
                  </div>
                  <h3 className="font-medium text-sm">{alert.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {alert.region}
                    </span>
                    <span className="flex items-center gap-1">
                      <Server className="h-3 w-3" />
                      {alert.affectedSystems.length} systems
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-0.5">
                  <p className="text-xs font-medium">{alert.businessImpact}</p>
                  <p className="text-xs text-error">{alert.slaRisk}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
