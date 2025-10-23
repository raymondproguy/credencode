import React from 'react';
import { Settings, Zap, CheckCircle, XCircle } from 'lucide-react';

interface IntelligenceSettingsProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const IntelligenceSettings: React.FC<IntelligenceSettingsProps> = ({
  enabled,
  onToggle
}) => {
  const features = [
    { name: 'Auto-completion', description: 'Smart code suggestions as you type', enabled: true },
    { name: 'Error Checking', description: 'Real-time syntax and error detection', enabled: true },
    { name: 'Code Snippets', description: 'Quick code templates and patterns', enabled: true },
    { name: 'Parameter Hints', description: 'Function parameter information', enabled: true },
    { name: 'Quick Suggestions', description: 'Inline code suggestions', enabled: true }
  ];

  return (
    <div className="intelligence-settings">
      <div className="settings-header">
        <Zap size={18} />
        <h4>Code Intelligence</h4>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="intelligence-toggle"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
          />
          <label htmlFor="intelligence-toggle"></label>
        </div>
      </div>

      <div className="settings-description">
        <p>Enable smart code assistance features including auto-completion, error checking, and code snippets.</p>
      </div>

      <div className="features-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <div className="feature-info">
              <span className="feature-name">{feature.name}</span>
              <span className="feature-description">{feature.description}</span>
            </div>
            <div className="feature-status">
              {feature.enabled ? (
                <CheckCircle size={16} color="#4CAF50" />
              ) : (
                <XCircle size={16} color="#f44336" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="settings-tip">
        <small>
          💡 <strong>Tip:</strong> Use <code>Ctrl+Space</code> to trigger suggestions manually
        </small>
      </div>
    </div>
  );
};
