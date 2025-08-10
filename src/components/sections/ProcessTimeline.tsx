
import ProcessSteps from './ProcessSteps';

// Mantém compatibilidade com a API antiga
interface Step {
  titulo: string;
  voce: string;
  nos: string;
  prazo: string;
}

interface ProcessTimelineProps {
  variant?: 'horizontal' | 'vertical';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  steps: Step[];
  note?: string;
}

export default function ProcessTimeline({
  variant = 'horizontal',
  separator = 'none',
  title,
  subtitle,
  steps,
  note,
}: ProcessTimelineProps) {
  // Converte a API antiga para a nova
  const convertedSteps = steps.map(step => ({
    title: step.titulo,
    you: [step.voce],
    us: [step.nos],
    duration: step.prazo,
  }));

  const processVariant = variant === 'horizontal' ? 'horizontal' : 'vertical';

  return (
    <ProcessSteps
      title={title}
      subtitle={subtitle}
      steps={convertedSteps}
      footnote={note}
      variant={processVariant}
      separator={separator}
    />
  );
}
