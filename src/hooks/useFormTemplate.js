import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useFormTemplate = () => {
  const [isGeneratingTemplate, setIsGeneratingTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = useSelector((state) => state.ticket.templates);

  const handleGenerateTemplate = () => {
    setIsGeneratingTemplate(!isGeneratingTemplate);
  };

  const updateSelectedTemplate = (index) => {
    setSelectedTemplate(templates[index]);
  };

  useEffect(() => {
    console.log('TEMPLATES', templates);
  }, [templates]);

  return {
    isGeneratingTemplate,
    templates,
    selectedTemplate,
    handleGenerateTemplate,
    updateSelectedTemplate,
  };
};

export default useFormTemplate;
