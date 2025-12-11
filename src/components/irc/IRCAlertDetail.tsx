import { useState, useEffect, useCallback } from 'react';
import { IRCAlert, SimulationScenario, WorkflowStep } from '@/lib/ircAlertData';
import {
  ArrowLeft, AlertTriangle, Brain, Play, Zap, GitBranch, FileText, MessageSquareWarning,
  CheckCircle, Clock, XCircle, Loader2, Shield, Target, Activity, Minus, X,
  Server, MapPin, DollarSign, ChevronRight, Pause, Users, UserCheck, Building2, Headphones, PhoneCall, PhoneForwarded, UserPlus, CircleDotDashed,
  TrendingUp, Eye, ArrowRight, BarChart3, RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useWarRoom, ParticipantStatus, ParticipantType, WarRoomParticipant } from '@/hooks/useWarRoom';

interface IRCAlertDetailProps {
  alert: IRCAlert;
  onBack: () => void;
}

interface ExecutionAgent {
  name: string;
  status: 'idle' | 'active' | 'completed';
  currentTask: string;
  progress: number;
}

const phaseLabels = {
  situation: '1. Situation',
  detection: '2. Detection',
  decision: '3. Decision',
  action: '4. Action',
  resolution: '5. Resolution',
};

const statusIcons = {
  completed: <CheckCircle className="h-3 w-3 text-success" />,
  'in-progress': <Loader2 className="h-3 w-3 text-muted-foreground animate-spin" />,
  pending: <Clock className="h-3 w-3 text-muted-foreground" />,
  blocked: <XCircle className="h-3 w-3 text-error" />,
};

const riskColors = {
  low: 'text-muted-foreground border-border/30 bg-muted/10',
  medium: 'text-muted-foreground border-border/50 bg-muted/20',
  high: 'text-error border-error/30 bg-error/10',
};

// AI Strategy details with deep dive info
const aiStrategyDetails: Record<string, {
  title: string;
  confidence: number;
  howItWorks: string;
  resolutionPath: string[];
  estimatedImpact: string;
  riskMitigation: string;
}> = {
  'Recommend immediate failover to US-West-2 based on 94.7% historical success rate for similar incidents': {
    title: 'Immediate Failover Strategy',
    confidence: 94.7,
    howItWorks: 'This strategy leverages automated failover scripts to redirect all traffic from the degraded US-East-1 region to the healthy US-West-2 region. The system will spin up pre-configured containers, update DNS records, and promote database replicas.',
    resolutionPath: [
      'Initiate container spin-up in US-West-2 (847 containers)',
      'Update DNS TTL to 60 seconds for faster propagation',
      'Promote read replicas to primary in secondary region',
      'Redirect load balancer traffic to healthy endpoints',
      'Validate health checks across all services',
      'Complete traffic steering to US-West-2'
    ],
    estimatedImpact: 'Full service restoration within 15 minutes. Expected to recover 96.7% of failed transactions.',
    riskMitigation: 'Automatic rollback triggers if health checks fail. Database sync verified before traffic switch.'
  },
  'Suggest prioritizing EU payment gateway (€847K/hour) over APAC (¥423K/hour) if partial failover required': {
    title: 'Prioritized Regional Recovery',
    confidence: 91.2,
    howItWorks: 'Revenue-optimized partial failover that prioritizes high-value regions. EU processing takes precedence based on real-time revenue impact analysis. APAC follows with 3-minute delay to ensure stability.',
    resolutionPath: [
      'Analyze real-time revenue by region',
      'Initiate EU payment gateway failover first',
      'Validate EU transaction processing',
      'Begin APAC failover sequence',
      'Monitor cross-region latency',
      'Confirm all regional gateways operational'
    ],
    estimatedImpact: 'EU recovery in 8 minutes, APAC in 11 minutes. Revenue protection: €1.2M saved.',
    riskMitigation: 'Regional isolation prevents cascade failures. Independent rollback per region.'
  },
  'Pre-emptively scale authentication services by 340% based on post-failover traffic patterns': {
    title: 'Proactive Auth Scaling',
    confidence: 88.5,
    howItWorks: 'Based on historical failover patterns, authentication services experience a 340% traffic spike as users retry failed sessions. This strategy pre-scales auth infrastructure before the surge hits.',
    resolutionPath: [
      'Analyze historical post-failover traffic patterns',
      'Provision additional auth pods (current + 340%)',
      'Update connection pool limits',
      'Pre-warm authentication caches',
      'Enable enhanced session recovery',
      'Monitor auth success rates'
    ],
    estimatedImpact: 'Prevents secondary outage. Auth success rate maintained above 99.5%.',
    riskMitigation: 'Auto-scaling policies set to handle unexpected load. Circuit breakers active.'
  },
  'Alert Customer Success to prepare communication for 23 enterprise clients with >$1M annual contracts': {
    title: 'Enterprise Client Communication',
    confidence: 96.3,
    howItWorks: 'Proactive outreach to high-value enterprise clients reduces support ticket volume by 67% and maintains trust. Automated status page updates combined with personalized outreach.',
    resolutionPath: [
      'Identify 23 enterprise clients by contract value',
      'Generate personalized status updates',
      'Trigger automated status page update',
      'Initiate direct account manager outreach',
      'Prepare compensation/SLA credit calculations',
      'Schedule post-incident review calls'
    ],
    estimatedImpact: 'Customer satisfaction maintained. Reduces escalations by 78%.',
    riskMitigation: 'Communication templates pre-approved by legal. Escalation paths documented.'
  },
  'Recommend extending database connection pool timeout from 30s to 120s during transition': {
    title: 'Database Connection Optimization',
    confidence: 92.1,
    howItWorks: 'During failover, database connections experience temporary latency spikes. Extending timeout prevents premature connection drops and reduces retry storms that can overwhelm the system.',
    resolutionPath: [
      'Increase connection pool timeout to 120s',
      'Enable connection keep-alive optimization',
      'Activate query queuing for overflow',
      'Monitor connection pool utilization',
      'Gradually restore normal timeouts post-recovery',
      'Validate transaction completion rates'
    ],
    estimatedImpact: 'Prevents 23% of transaction failures during transition window.',
    riskMitigation: 'Automatic timeout restoration after stability confirmed. Alerting for pool exhaustion.'
  },
  'Implement adaptive rate limiting based on user behavior patterns': {
    title: 'Adaptive Rate Limiting',
    confidence: 87.4,
    howItWorks: 'Machine learning-based rate limiting that distinguishes legitimate users from attack traffic based on behavioral patterns, reducing false positives while blocking malicious requests.',
    resolutionPath: [
      'Deploy ML-based traffic classifier',
      'Analyze request patterns in real-time',
      'Apply graduated rate limits by risk score',
      'Whitelist known legitimate traffic patterns',
      'Block high-confidence malicious requests',
      'Continuously update behavioral models'
    ],
    estimatedImpact: 'Reduces false positive blocks by 89%. Attack mitigation within 2 minutes.',
    riskMitigation: 'Fallback to static rules if ML confidence drops. Manual override available.'
  },
  'Pre-authorize geo-blocking for known high-risk countries during attacks': {
    title: 'Pre-Authorized Geo-Blocking',
    confidence: 93.8,
    howItWorks: 'Pre-approved geo-blocking rules for known attack source countries, eliminating the 2-hour legal review delay during active attacks. GDPR-compliant with documented exceptions.',
    resolutionPath: [
      'Activate pre-approved geo-block rules',
      'Block traffic from top 5 attack source countries',
      'Log all blocked requests for audit',
      'Notify affected legitimate users via email',
      'Monitor attack traffic reduction',
      'Prepare removal plan post-attack'
    ],
    estimatedImpact: 'Immediate 73% reduction in attack traffic. Legal review time eliminated.',
    riskMitigation: 'VPN access maintained for legitimate users. Temporary blocks auto-expire in 24 hours.'
  },
  'Deploy additional authentication pods in anticipation of attack escalation': {
    title: 'Proactive Auth Capacity',
    confidence: 85.9,
    howItWorks: 'Scale authentication infrastructure by 500% before attack escalation, based on observed botnet behavior patterns that typically show 3x traffic increase 15-20 minutes after initial attack.',
    resolutionPath: [
      'Provision additional auth pods (5x current)',
      'Distribute pods across multiple availability zones',
      'Update load balancer configurations',
      'Pre-warm authentication caches',
      'Enable enhanced logging for forensics',
      'Activate backup identity providers'
    ],
    estimatedImpact: 'Auth success rate maintained above 97% during peak attack.',
    riskMitigation: 'Auto-scaling prevents over-provisioning costs. Pods auto-terminate post-attack.'
  },
  'Schedule batch operations during low-traffic windows (2-5 AM UTC)': {
    title: 'Batch Operation Scheduling',
    confidence: 97.2,
    howItWorks: 'Reschedule resource-intensive batch operations to 2-5 AM UTC when system load is 78% lower, preventing replication lag during peak business hours.',
    resolutionPath: [
      'Analyze current batch operation schedule',
      'Identify movable operations',
      'Reschedule to 2-5 AM UTC window',
      'Update job scheduling configurations',
      'Monitor replication lag trends',
      'Validate batch completion times'
    ],
    estimatedImpact: 'Replication lag reduced by 89% during business hours.',
    riskMitigation: 'Batch monitoring ensures completion before peak hours. Failsafe delays for long-running jobs.'
  },
  'Implement write-ahead log compression to reduce replication bandwidth': {
    title: 'WAL Compression Strategy',
    confidence: 91.5,
    howItWorks: 'Enable write-ahead log compression to reduce replication bandwidth by up to 60%, allowing replicas to keep up during high-write periods without increasing network infrastructure.',
    resolutionPath: [
      'Enable WAL compression on primary',
      'Update replica configurations',
      'Monitor compression ratios',
      'Validate replication consistency',
      'Tune compression levels for optimal balance',
      'Document performance improvements'
    ],
    estimatedImpact: 'Replication bandwidth reduced by 60%. Lag reduced from 23s to under 500ms.',
    riskMitigation: 'Gradual rollout across replicas. CPU overhead monitored.'
  },
  'Pre-provision additional capacity before marketing campaigns': {
    title: 'Campaign Capacity Planning',
    confidence: 94.6,
    howItWorks: 'Integration with marketing calendar to automatically scale infrastructure 24 hours before major campaigns, preventing capacity-related incidents during high-visibility events.',
    resolutionPath: [
      'Sync with marketing campaign calendar',
      'Analyze historical campaign traffic patterns',
      'Calculate required capacity increase',
      'Pre-provision infrastructure 24h in advance',
      'Run load tests on scaled infrastructure',
      'Monitor during campaign execution'
    ],
    estimatedImpact: 'Zero capacity-related incidents during campaigns. 99.99% uptime maintained.',
    riskMitigation: 'Automated scaling based on real-time metrics. Fallback to manual scaling available.'
  },
  'Implement automated DNS validation for all certificate renewals': {
    title: 'Automated DNS Validation',
    confidence: 98.7,
    howItWorks: 'Fully automated DNS validation for SSL certificate renewals across all domains, eliminating manual intervention and preventing renewal failures due to missing DNS records.',
    resolutionPath: [
      'Deploy automated DNS management integration',
      'Configure validation record templates',
      'Test automation with non-production certs',
      'Enable for all production domains',
      'Monitor renewal success rates',
      'Alert on validation failures'
    ],
    estimatedImpact: 'Certificate renewal success rate increases to 99.9%. Zero manual intervention required.',
    riskMitigation: 'Fallback to manual renewal if automation fails. 30-day advance warnings maintained.'
  },
  'Migrate to wildcard certificates to reduce management overhead': {
    title: 'Wildcard Certificate Migration',
    confidence: 95.3,
    howItWorks: 'Consolidate 47 individual domain certificates into 5 wildcard certificates, reducing management overhead by 90% and simplifying renewal processes.',
    resolutionPath: [
      'Audit current certificate inventory',
      'Group domains by wildcard eligibility',
      'Generate new wildcard certificates',
      'Plan staged migration schedule',
      'Update server configurations',
      'Decommission old certificates'
    ],
    estimatedImpact: 'Certificate count reduced from 47 to 5. Management time reduced by 90%.',
    riskMitigation: 'Staged migration with rollback capability. Testing in staging environment first.'
  },
  'Configure 45-day advance renewal to allow for validation issues': {
    title: 'Extended Renewal Window',
    confidence: 99.1,
    howItWorks: 'Extend certificate renewal initiation from 30 to 45 days, providing additional buffer for resolving DNS validation issues or other renewal blockers.',
    resolutionPath: [
      'Update renewal automation settings',
      'Configure 45-day advance renewal trigger',
      'Set up multi-stage reminder alerts',
      'Document escalation procedures',
      'Train team on extended timeline',
      'Monitor renewal metrics'
    ],
    estimatedImpact: 'Zero certificate expiration incidents. 100% renewal success rate.',
    riskMitigation: 'Multiple reminder stages at 45, 30, 14, and 7 days. Escalation to management at 7 days.'
  }
};

// Simulation-specific actions mapping
const simulationActions: Record<string, { automated: string[], human: string[] }> = {
  'SIM-001': {
    automated: [
      'Initiating full traffic migration to US-West-2',
      'Spinning up 847 redundant containers',
      'Updating DNS records globally',
      'Promoting database read replicas',
      'Invalidating CDN cache'
    ],
    human: [
      'Monitor failover progress dashboard',
      'Verify payment gateway connectivity',
      'Confirm customer transaction recovery',
      'Update status page for customers'
    ]
  },
  'SIM-002': {
    automated: [
      'Migrating EU traffic to secondary region',
      'Migrating APAC traffic to secondary region',
      'Maintaining US traffic on degraded primary',
      'Adjusting load balancer weights'
    ],
    human: [
      'Monitor regional latency metrics',
      'Coordinate with regional support teams',
      'Prepare rollback procedure if needed'
    ]
  },
  'SIM-003': {
    automated: [
      'Enabling enhanced monitoring mode',
      'Setting up AWS status page alerts',
      'Preparing failover scripts for quick activation'
    ],
    human: [
      'Monitor AWS status updates',
      'Prepare customer communication',
      'Be ready to escalate if ETA exceeds threshold'
    ]
  }
};

interface SimulationStep {
  id: number;
  name: string;
  status: 'pending' | 'running' | 'completed';
  duration: number;
}

const allParticipants: WarRoomParticipant[] = [
  // Approval Chain
  { id: 'approver-1', name: 'Alex Chen', role: 'Senior DevOps Engineer', type: 'approval', status: 'pending' },
  { id: 'approver-2', name: 'Sarah Mitchell', role: 'Director of Operations', type: 'approval', status: 'pending' },
  { id: 'approver-3', name: 'Michael Torres', role: 'VP of Infrastructure', type: 'approval', status: 'pending' },
  // Team Coordination
  { id: 'coord-1', name: 'David Kim', role: 'Engineering Lead', type: 'coordination', status: 'pending' },
  { id: 'coord-2', name: 'Emily Watson', role: 'Customer Success Lead', type: 'coordination', status: 'pending' },
  { id: 'coord-3', name: 'Robert Chen', role: 'Finance Lead', type: 'coordination', status: 'pending' },
  { id: 'coord-4', name: 'Lisa Park', role: 'Security Lead', type: 'coordination', status: 'pending' },
];

const typeConfig = {
  approval: { name: 'Approval Chain', icon: <UserCheck className="h-3 w-3" /> },
  coordination: { name: 'Team Coordination', icon: <Users className="h-3 w-3" /> },
};

const statusConfig: Record<ParticipantStatus, { text: string; icon: JSX.Element; color: string }> = {
  pending: { text: 'Standby', icon: <CircleDotDashed className="h-2.5 w-2.5" />, color: 'bg-muted/80 border-muted-foreground/20' },
  calling: { text: 'Calling...', icon: <PhoneCall className="h-2.5 w-2.5 animate-pulse" />, color: 'bg-muted/50 text-foreground border-border' },
  joining: { text: 'Joining...', icon: <PhoneForwarded className="h-2.5 w-2.5" />, color: 'bg-muted/50 text-foreground border-border' },
  joined: { text: 'Joined', icon: <CheckCircle className="h-2.5 w-2.5" />, color: 'bg-success/10 text-success border-success/30' },
};

export function IRCAlertDetail({ alert, onBack }: IRCAlertDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationSteps, setSimulationSteps] = useState<SimulationStep[]>([]);
  const [simulationPaused, setSimulationPaused] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState<string | null>(null);
  const [workflowTriggered, setWorkflowTriggered] = useState(false);
  const [actionsTaken, setActionsTaken] = useState<string[]>([]);

  // New states for enhanced functionality
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [showSimulationResults, setShowSimulationResults] = useState(false);
  const [executionActive, setExecutionActive] = useState(false);
  const [executionAgents, setExecutionAgents] = useState<ExecutionAgent[]>([]);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [impactMetrics, setImpactMetrics] = useState<any>(null);
  const [warRoomSimulationResults, setWarRoomSimulationResults] = useState<any>(null);

  const {
    isOpen: warRoomOpen,
    isMinimized: warRoomMinimized,
    setIsMinimized: setWarRoomMinimized,
    closeDialog: closeWarRoomDialog,
    participants,
    isActive: warRoomActive,
    assemblyTime: decisionTime,
    isAssembling,
    newMemberName,
    newMemberRole,
    heliosTypingIndex,
    log: warRoomLog,
    HELIOS_ACTIONS,
    initiate: initiateWarRoom,
    ...warRoomActions
  } = useWarRoom();
  const handleTakeAction = (action: string) => {
    setActionsTaken(prev => [...prev, action]);
    toast.success(`Action initiated: ${action}`);
  };

  const handleStrategyToggle = (strategy: string) => {
    setSelectedStrategies(prev =>
      prev.includes(strategy)
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    );
  };

  const handleDeepDive = (strategy: string) => {
    setSelectedStrategy(strategy);
    setDeepDiveOpen(true);
  };

  const handleSimulateStrategies = async () => {
    if (selectedStrategies.length === 0) {
      toast.error('Please select at least one strategy to simulate');
      return;
    }

    setSimulationRunning(true);
    setShowSimulationResults(false);

    const steps: SimulationStep[] = [
      { id: 1, name: 'Analyzing selected strategies', status: 'pending', duration: 1000 },
      { id: 2, name: 'Building simulation environment', status: 'pending', duration: 1200 },
      { id: 3, name: 'Executing strategy combinations', status: 'pending', duration: 1500 },
      { id: 4, name: 'Calculating impact projections', status: 'pending', duration: 1000 },
      { id: 5, name: 'Validating resolution paths', status: 'pending', duration: 800 },
      { id: 6, name: 'Generating final report', status: 'pending', duration: 600 },
    ];

    setSimulationSteps(steps);
    toast.info('Starting strategy simulation...');

    for (let i = 0; i < steps.length; i++) {
      setSimulationSteps(prev => prev.map((s, idx) =>
        idx === i ? { ...s, status: 'running' } : s
      ));

      await new Promise(resolve => setTimeout(resolve, steps[i].duration));

      setSimulationSteps(prev => prev.map((s, idx) =>
        idx === i ? { ...s, status: 'completed' } : s
      ));
    }

    // Generate simulation results
    const avgConfidence = selectedStrategies.reduce((acc, s) => {
      const details = aiStrategyDetails[s];
      return acc + (details?.confidence || 90);
    }, 0) / selectedStrategies.length;

    setSimulationResults({
      successProbability: avgConfidence,
      estimatedTime: '12 minutes',
      recoveryRate: '97.3%',
      riskLevel: avgConfidence > 92 ? 'Low' : avgConfidence > 85 ? 'Medium' : 'High',
      strategies: selectedStrategies.map(s => ({
        name: aiStrategyDetails[s]?.title || s.substring(0, 50) + '...',
        impact: aiStrategyDetails[s]?.estimatedImpact || 'Positive impact expected',
        confidence: aiStrategyDetails[s]?.confidence || 90
      }))
    });

    setSimulationRunning(false);
    setShowSimulationResults(true);
    toast.success('Simulation complete!');
  };

  const handleExecuteStrategies = async () => {
    setActiveTab('execution');
    setExecutionActive(true);
    setExecutionProgress(0);

    // Initialize agents
    const agents: ExecutionAgent[] = [
      { name: 'HELIOS Orchestrator', status: 'idle', currentTask: 'Awaiting initialization', progress: 0 },
      { name: 'Infrastructure Agent', status: 'idle', currentTask: 'Standby', progress: 0 },
      { name: 'Database Agent', status: 'idle', currentTask: 'Standby', progress: 0 },
      { name: 'Network Agent', status: 'idle', currentTask: 'Standby', progress: 0 },
      { name: 'Monitoring Agent', status: 'idle', currentTask: 'Standby', progress: 0 },
    ];
    setExecutionAgents(agents);

    // Simulate agent workflow
    const agentTasks = [
      { agent: 0, task: 'Initializing execution pipeline', duration: 1500 },
      { agent: 0, task: 'Coordinating agent deployment', duration: 1000 },
      { agent: 1, task: 'Spinning up containers in US-West-2', duration: 2000 },
      { agent: 2, task: 'Promoting read replicas', duration: 1800 },
      { agent: 3, task: 'Updating DNS records globally', duration: 1500 },
      { agent: 1, task: 'Configuring load balancers', duration: 1200 },
      { agent: 4, task: 'Deploying health check probes', duration: 1000 },
      { agent: 3, task: 'Steering traffic to healthy region', duration: 1500 },
      { agent: 4, task: 'Validating service health', duration: 1200 },
      { agent: 0, task: 'Finalizing execution', duration: 800 },
    ];

    for (let i = 0; i < agentTasks.length; i++) {
      const { agent, task, duration } = agentTasks[i];

      setExecutionAgents(prev => prev.map((a, idx) =>
        idx === agent
          ? { ...a, status: 'active', currentTask: task, progress: 0 }
          : { ...a, status: a.progress === 100 ? 'completed' : a.status }
      ));

      // Animate progress
      const steps = 10;
      for (let j = 0; j <= steps; j++) {
        await new Promise(resolve => setTimeout(resolve, duration / steps));
        setExecutionAgents(prev => prev.map((a, idx) =>
          idx === agent ? { ...a, progress: (j / steps) * 100 } : a
        ));
        setExecutionProgress(((i + j / steps) / agentTasks.length) * 100);
      }

      setExecutionAgents(prev => prev.map((a, idx) =>
        idx === agent ? { ...a, status: 'completed', progress: 100 } : a
      ));
    }

    setExecutionActive(false);
    setExecutionProgress(100);

    // Generate impact metrics
    setImpactMetrics({
      serviceRestoration: 97.3,
      transactionsRecovered: 94847,
      revenueProtected: '$2.1M',
      slaCompliance: 99.92,
      mttr: '14m 23s',
      affectedUsersResolved: 98.7
    });

    toast.success('Execution complete! View Impact tab for results.');
  };

  const handleEndWarRoom = useCallback(() => {
    // Save simulation results before ending war room
    if (showSimulationResults && simulationResults) {
      setWarRoomSimulationResults(simulationResults);
    }
    warRoomActions.resetState();
    setActiveTab('decision');
    toast.info("War Room session has ended. View your simulation results in the Decision tab.");
  }, [warRoomActions, setActiveTab, showSimulationResults, simulationResults]);

  const handleResetSimulation = useCallback(() => {
    setSelectedStrategies([]);
    setSimulationResults(null);
    setShowSimulationResults(false);
    setSimulationSteps([]);
    setWarRoomSimulationResults(null);
    toast.info("Simulation has been reset.");
  }, []);

  const handleReturnToDashboard = useCallback(() => {
    closeWarRoomDialog();
  }, [closeWarRoomDialog]);

  const handleMinimizeWarRoom = useCallback(() => {
    closeWarRoomDialog();
    setWarRoomMinimized(true);
  }, [closeWarRoomDialog, setWarRoomMinimized]);


  const handleInitiateWarRoom = useCallback(() => {
    initiateWarRoom();
  }, [initiateWarRoom]);

  const getStrategyDetails = (strategy: string) => {
    return aiStrategyDetails[strategy] || {
      title: strategy.substring(0, 50) + '...',
      confidence: 90,
      howItWorks: 'AI-powered strategy based on historical incident data and predictive analytics.',
      resolutionPath: ['Analyze current state', 'Deploy automated remediation', 'Validate results', 'Confirm resolution'],
      estimatedImpact: 'Expected positive impact on system recovery.',
      riskMitigation: 'Standard rollback procedures in place.'
    };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Minimized War Room Widget */}
      {warRoomActive && warRoomMinimized && (
        <div
          className="fixed bottom-4 right-4 z-50 p-3 rounded-lg shadow-lg bg-card border border-primary/30 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => {
            setWarRoomMinimized(false);
            initiateWarRoom(); // This re-opens the dialog
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-primary">
              <Brain className="h-5 w-5" />
              <span className="font-semibold">War Room Active</span>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success">
              {decisionTime}s
            </Badge>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Alerts
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={cn(
              alert.severity === 'critical' && 'bg-error text-error-foreground',
              alert.severity === 'high' && 'bg-warning text-warning-foreground',
              alert.severity === 'medium' && 'bg-noc text-noc-foreground',
              alert.severity === 'low' && 'bg-muted text-muted-foreground'
            )}>
              {alert.severity.toUpperCase()}
            </Badge>
            <span className="font-mono text-sm">{alert.id}</span>
          </div>
          <h1 className="text-2xl font-bold">{alert.title}</h1>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-3 flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Detected</p>
              <p className="text-sm font-medium">{new Date(alert.timestamp).toLocaleTimeString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-3 flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Region</p>
              <p className="text-sm font-medium">{alert.region}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-3 flex items-center gap-3">
            <Server className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Systems</p>
              <p className="text-sm font-medium">{alert.affectedSystems.length} affected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-error/30 bg-error/5">
          <CardContent className="p-3 flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-error" />
            <div>
              <p className="text-xs text-muted-foreground">Impact</p>
              <p className="text-sm font-medium text-error">{alert.businessImpact.split(' - ')[1] || alert.businessImpact}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="overview" className="text-xs px-2 py-2">
            <FileText className="h-3 w-3 mr-1" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-xs px-2 py-2">
            <Brain className="h-3 w-3 mr-1" />
            AI recommendations
          </TabsTrigger>
          <TabsTrigger value="decision" className="text-xs px-2 py-2">
            <Target className="h-3 w-3 mr-1" />
            Decision
          </TabsTrigger>
          <TabsTrigger value="execution" className="text-xs px-2 py-2">
            <Zap className="h-3 w-3 mr-1" />
            Execution
          </TabsTrigger>
          <TabsTrigger value="impact" className="text-xs px-2 py-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            Impact
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Incident Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Alert ID</h4>
                  <p className="font-mono">{alert.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Source</h4>
                  <p>{alert.source}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Timestamp</h4>
                  <p>{new Date(alert.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Current Phase</h4>
                  <Badge>{phaseLabels[alert.phase]}</Badge>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-error/30 bg-error/5">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">SLA Risk</h4>
                <p className="text-error font-medium">{alert.slaRisk}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Business Context</h4>
                <p className="text-muted-foreground">{alert.details.situation.businessContext}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-soc" />
                    SOC Role
                  </h4>
                  <p className="text-sm text-muted-foreground">{alert.details.situation.socRole}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-noc" />
                    NOC Role
                  </h4>
                  <p className="text-sm text-muted-foreground">{alert.details.situation.nocRole}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Affected Systems</h4>
                <div className="flex flex-wrap gap-2">
                  {alert.affectedSystems.map((system, i) => (
                    <Badge key={i} variant="outline">{system}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Recommendations Tab - Updated with Deep Dive */}
        <TabsContent value="ai" className="mt-6 space-y-4">
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                HELIOS AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alert.details.aiRecommendations.map((rec, i) => {
                const details = getStrategyDetails(rec);
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="p-2 rounded bg-primary/20">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium">{details.title}</p>
                        <Badge variant="outline" className="text-xs bg-primary/10">
                          {details.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeepDive(rec)}
                      className="gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      Deep Dive
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Decision Tab - Updated with strategy selection */}
        <TabsContent value="decision" className="mt-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                Strategy Selection & Simulation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="p-3 rounded-lg border border-border/50 bg-muted/30">
                <h4 className="text-xs font-medium text-muted-foreground mb-1">Leader's Role</h4>
                <p className="text-xs text-muted-foreground">{alert.details.decision.leaderRole}</p>
              </div>

              {/* Initiate War Room - moved after Leader's Role */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleInitiateWarRoom}
                  className={cn(
                    "gap-2 transition-all",
                    warRoomActive ? "bg-success/20 text-success hover:bg-success/30" : ""
                  )}
                  disabled={isAssembling || warRoomActive}
                >
                  {warRoomActive ? <><CheckCircle className="h-3 w-3" /> War Room Live</> : (isAssembling ? <><Loader2 className="h-3 w-3 animate-spin" /> Assembling...</> : <><Users className="h-3 w-3" /> Initiate War Room</>)}
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleTakeAction('Approve Failover')} className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Approve Failover
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleTakeAction('Override Prioritization')}>
                  Override
                </Button>
              </div>

              {warRoomActive && (
                <Card className="border-success/30 bg-success/5">
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success" />
                        <span className="text-xs font-medium text-success">War Room Active</span>
                      </div>
                      <Badge variant="outline" className="text-xs bg-success/10 text-success">
                        {decisionTime}s
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* War Room Simulation Results - shown after war room ends */}
              {warRoomSimulationResults && !warRoomActive && (
                <Card className="border-success/30 bg-success/5">
                  <CardHeader className="py-2">
                    <CardTitle className="flex items-center justify-between text-xs text-success">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        War Room Simulation Results
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleResetSimulation}
                        className="h-6 px-2 gap-1 text-muted-foreground hover:text-foreground"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Reset
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center p-2 rounded bg-background/50">
                        <p className="text-sm font-semibold text-success">{warRoomSimulationResults.successProbability.toFixed(1)}%</p>
                        <p className="text-[10px] text-muted-foreground">Success</p>
                      </div>
                      <div className="text-center p-2 rounded bg-background/50">
                        <p className="text-sm font-semibold">{warRoomSimulationResults.estimatedTime}</p>
                        <p className="text-[10px] text-muted-foreground">Time</p>
                      </div>
                      <div className="text-center p-2 rounded bg-background/50">
                        <p className="text-sm font-semibold">{warRoomSimulationResults.recoveryRate}</p>
                        <p className="text-[10px] text-muted-foreground">Recovery</p>
                      </div>
                      <div className="text-center p-2 rounded bg-background/50">
                        <Badge className={cn(
                          "text-[10px]",
                          warRoomSimulationResults.riskLevel === 'Low' && 'bg-success',
                          warRoomSimulationResults.riskLevel === 'Medium' && 'bg-muted text-foreground',
                          warRoomSimulationResults.riskLevel === 'High' && 'bg-error'
                        )}>
                          {warRoomSimulationResults.riskLevel}
                        </Badge>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Risk</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleExecuteStrategies}
                      className="w-full gap-2"
                      size="sm"
                    >
                      <Zap className="h-3 w-3" />
                      Execute Strategies
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">SOC/NOC Functionality</h4>
                <p className="text-xs text-muted-foreground">{alert.details.decision.socNocFunctionality}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Execution Tab - Merged Simulation & Actions with Agent Workflow */}
        <TabsContent value="execution" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Agent Execution Workflow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {executionAgents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Zap className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>No execution in progress</p>
                  <p className="text-sm">Select strategies in the Decision tab and click Execute to begin</p>
                </div>
              ) : (
                <>
                  {/* Overall Progress */}
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Overall Execution Progress</span>
                      <span className="text-sm font-mono">{executionProgress.toFixed(0)}%</span>
                    </div>
                    <Progress value={executionProgress} className="h-3" />
                  </div>

                  {/* Agent Workflow Visualization */}
                  <div className="space-y-3">
                    {executionAgents.map((agent, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-4 rounded-lg border transition-all",
                          agent.status === 'active' && "border-primary bg-primary/5 animate-pulse",
                          agent.status === 'completed' && "border-success/50 bg-success/5",
                          agent.status === 'idle' && "border-border/50 bg-muted/30"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              agent.status === 'active' && "bg-primary text-primary-foreground",
                              agent.status === 'completed' && "bg-success text-success-foreground",
                              agent.status === 'idle' && "bg-muted text-muted-foreground"
                            )}>
                              {agent.status === 'completed' ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : agent.status === 'active' ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Clock className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{agent.name}</p>
                              <p className="text-xs text-muted-foreground">{agent.currentTask}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className={cn(
                            agent.status === 'active' && "bg-primary/10 text-primary",
                            agent.status === 'completed' && "bg-success/10 text-success",
                            agent.status === 'idle' && "bg-muted text-muted-foreground"
                          )}>
                            {agent.status === 'completed' ? 'Complete' : agent.status === 'active' ? 'Running' : 'Standby'}
                          </Badge>
                        </div>
                        {agent.status !== 'idle' && (
                          <Progress value={agent.progress} className="h-1.5" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Execution Complete Message */}
                  {executionProgress === 100 && (
                    <Card className="border-success/30 bg-success/5">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-success" />
                          <div>
                            <p className="font-semibold text-success">Execution Complete</p>
                            <p className="text-sm text-muted-foreground">
                              All strategies have been successfully executed. View the Impact tab for detailed results.
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => setActiveTab('impact')}
                          variant="outline"
                          className="mt-4 gap-2"
                        >
                          <BarChart3 className="h-4 w-4" />
                          View Impact Analysis
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Impact Tab - Replaces Workflow */}
        <TabsContent value="impact" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Resolution Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!impactMetrics ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>No impact data available</p>
                  <p className="text-sm">Execute strategies to see impact analysis</p>
                </div>
              ) : (
                <>
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="border-success/30 bg-success/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-success">{impactMetrics.serviceRestoration}%</p>
                        <p className="text-sm text-muted-foreground">Service Restored</p>
                      </CardContent>
                    </Card>
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-primary">{impactMetrics.transactionsRecovered.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Transactions Recovered</p>
                      </CardContent>
                    </Card>
                    <Card className="border-warning/30 bg-warning/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-warning">{impactMetrics.revenueProtected}</p>
                        <p className="text-sm text-muted-foreground">Revenue Protected</p>
                      </CardContent>
                    </Card>
                    <Card className="border-success/30 bg-success/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-success">{impactMetrics.slaCompliance}%</p>
                        <p className="text-sm text-muted-foreground">SLA Compliance</p>
                      </CardContent>
                    </Card>
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-primary">{impactMetrics.mttr}</p>
                        <p className="text-sm text-muted-foreground">Mean Time to Resolve</p>
                      </CardContent>
                    </Card>
                    <Card className="border-success/30 bg-success/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-success">{impactMetrics.affectedUsersResolved}%</p>
                        <p className="text-sm text-muted-foreground">Users Resolved</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Resolution Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Resolution Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <div>
                          <p className="font-medium">Primary Systems Restored</p>
                          <p className="text-sm text-muted-foreground">All payment APIs operational in US-West-2</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <div>
                          <p className="font-medium">Database Failover Complete</p>
                          <p className="text-sm text-muted-foreground">Read replicas promoted, replication lag at 145ms</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <div>
                          <p className="font-medium">Traffic Steering Active</p>
                          <p className="text-sm text-muted-foreground">96.7% of traffic now routed to healthy region</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10">
                        <Clock className="h-5 w-5 text-warning" />
                        <div>
                          <p className="font-medium">DNS Propagation In Progress</p>
                          <p className="text-sm text-muted-foreground">3.3% of users may need to clear browser cache</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Comparison with Manual Response */}
                  <Card className="border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        HELIOS vs Manual Response
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-primary/5">
                          <p className="font-semibold text-primary mb-2">HELIOS Automated</p>
                          <ul className="space-y-1 text-sm">
                            <li>• Resolution Time: {impactMetrics.mttr}</li>
                            <li>• Decision Time: 8.5 seconds</li>
                            <li>• Coordination: Automated</li>
                            <li>• Human Touchpoints: 2</li>
                          </ul>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30">
                          <p className="font-semibold text-muted-foreground mb-2">Traditional Manual</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Resolution Time: 45+ minutes</li>
                            <li>• Decision Time: 23 minutes</li>
                            <li>• Coordination: 4 team calls</li>
                            <li>• Human Touchpoints: 12+</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-success/10 text-center">
                        <p className="text-success font-semibold">68% Faster Resolution with HELIOS</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Deep Dive Dialog */}
      <Dialog open={deepDiveOpen} onOpenChange={setDeepDiveOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Strategy Deep Dive
            </DialogTitle>
          </DialogHeader>

          {selectedStrategy && (
            <div className="space-y-4">
              {(() => {
                const details = getStrategyDetails(selectedStrategy);
                return (
                  <>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                      <div>
                        <h3 className="font-semibold text-lg">{details.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{selectedStrategy}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">{details.confidence}%</p>
                        <p className="text-xs text-muted-foreground">Confidence</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">How It Works</h4>
                      <p className="text-sm text-muted-foreground">{details.howItWorks}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Resolution Path</h4>
                      <div className="space-y-2">
                        {details.resolutionPath.map((step, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 rounded bg-muted/50">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </div>
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                        <h4 className="font-semibold text-success mb-2">Expected Impact</h4>
                        <p className="text-sm">{details.estimatedImpact}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                        <h4 className="font-semibold text-warning mb-2">Risk Mitigation</h4>
                        <p className="text-sm">{details.riskMitigation}</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* War Room Dialog - Bigger */}
      <Dialog open={warRoomOpen} onOpenChange={(open) => !open && handleReturnToDashboard()}>
        <DialogContent className="max-w-[95vw] w-[1400px] h-[95vh] flex flex-col">
          <DialogHeader className="pb-2">
            <DialogTitle className="flex items-center gap-2 text-sm">
              <Brain className="h-4 w-4 text-muted-foreground" />
              HELIOS War Room Coordination
            </DialogTitle>
            <DialogDescription className="text-xs">
              Assembling on-call roster for rapid decision-making.
            </DialogDescription>
          </DialogHeader>
          <div className="absolute top-3 right-10 flex items-center gap-0">
            <Button variant="ghost" size="icon" onClick={handleMinimizeWarRoom} className="text-muted-foreground h-6 w-6">
              <Minus className="h-3 w-3" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 overflow-hidden">
            {/* Left: War Room Bridge Assembly */}
            <div className="space-y-2 overflow-hidden">
              <h4 className="text-xs font-medium flex items-center gap-1 text-muted-foreground">
                <PhoneCall className="h-3 w-3" />
                Bridge Assembly
              </h4>
              <div className="space-y-1 max-h-[calc(100%-80px)] overflow-y-auto pr-1">
                {Object.entries(typeConfig).map(([typeKey, config]) => (
                  <div key={typeKey}>
                    <h5 className="text-[10px] font-medium text-muted-foreground my-1 flex items-center gap-1">{config.icon} {config.name}</h5>
                    {participants.filter(p => p.type === typeKey).map((person) => {
                      const currentStatus = statusConfig[person.status];
                      return (
                        <div key={person.id} className={cn("flex items-center gap-2 p-1.5 rounded border text-xs mb-1", currentStatus.color, person.status === 'pending' && "opacity-60")}>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-[11px]">{person.name}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{person.role}</div>
                          </div>
                          <Badge variant="outline" className={cn("text-[9px] px-1 py-0", currentStatus.color)}>
                            {currentStatus.icon}
                            {currentStatus.text}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              {!warRoomActive && !isAssembling && (
                <Button size="sm" className="w-full gap-1 text-xs" onClick={warRoomActions.startCallingSequence}>
                  <PhoneCall className="h-3 w-3" />
                  Assemble Bridge
                </Button>
              )}
            </div>

            {/* Middle: Strategy Simulation - Only visible when war room active */}
            <div className="space-y-2 overflow-hidden">
              <h4 className="text-xs font-medium flex items-center gap-1 text-muted-foreground">
                <Target className="h-3 w-3" />
                Strategy Simulation
              </h4>
              {warRoomActive ? (
                <div className="space-y-2 max-h-[calc(100%-40px)] overflow-y-auto pr-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Select strategies:</span>
                    <Badge variant="outline" className="text-[9px]">{selectedStrategies.length} selected</Badge>
                  </div>
                  {alert.details.aiRecommendations.slice(0, 4).map((rec, i) => {
                    const details = getStrategyDetails(rec);
                    const isSelected = selectedStrategies.includes(rec);
                    return (
                      <div key={i} className={cn("flex items-start gap-2 p-2 rounded border cursor-pointer text-xs", isSelected ? "border-success/50 bg-success/10" : "border-border/50 hover:border-border")} onClick={() => handleStrategyToggle(rec)}>
                        <Checkbox checked={isSelected} className="mt-0.5 h-3 w-3" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-[11px] truncate">{details.title}</span>
                            <Badge variant="outline" className="text-[9px]">{details.confidence}%</Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <Button size="sm" onClick={handleSimulateStrategies} disabled={selectedStrategies.length === 0 || simulationRunning} className="w-full gap-1 text-xs">
                    {simulationRunning ? <><Loader2 className="h-3 w-3 animate-spin" />Simulating...</> : <><Play className="h-3 w-3" />Simulate</>}
                  </Button>
                  {showSimulationResults && simulationResults && (
                    <Card className="border-success/30 bg-success/5">
                      <CardContent className="p-2 space-y-2">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-center p-1 rounded bg-background/50">
                            <p className="text-sm font-semibold text-success">{simulationResults.successProbability.toFixed(0)}%</p>
                            <p className="text-[9px] text-muted-foreground">Success</p>
                          </div>
                          <div className="text-center p-1 rounded bg-background/50">
                            <p className="text-sm font-semibold">{simulationResults.recoveryRate}</p>
                            <p className="text-[9px] text-muted-foreground">Recovery</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={handleResetSimulation} className="w-full gap-1 text-xs">
                          <RotateCcw className="h-3 w-3" />Reset
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 text-xs text-muted-foreground">
                  <p>Assemble bridge to access strategy simulation</p>
                </div>
              )}
            </div>

            {/* Right: Event Log */}
            <div className="space-y-2 overflow-hidden">
              <h4 className="text-xs font-medium flex items-center gap-1 text-muted-foreground">
                <Activity className="h-3 w-3" />
                Event Log
              </h4>
              <div className="space-y-1 h-[200px] overflow-y-auto p-2 rounded border bg-muted/30 text-xs">
                {warRoomLog.map((log, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="font-mono text-[9px] text-muted-foreground">{log.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    <p className="text-[10px] flex-1">{log.message}</p>
                  </div>
                ))}
              </div>
              {warRoomActive && (
                <Card className="border-success/30 bg-success/5">
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-success">{decisionTime}s</div>
                        <div className="text-[10px] text-muted-foreground">Assembly Time</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-success">75% Faster</div>
                        <div className="text-[10px] text-muted-foreground">vs. Manual</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          <DialogFooter className="pt-2">
            <Button variant="destructive" size="sm" onClick={handleEndWarRoom}>
              End War Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
