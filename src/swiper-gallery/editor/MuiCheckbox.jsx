import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function MuiCheckbox(props) {
    
    const { checked, onChange, label = __('Select') } = props;

    const handleChange = (event) => {
      if (onChange) {
          onChange(event.target.checked);
      }
  };

  return (
    <FormGroup>
      <FormControlLabel control={
        <Checkbox 
        size="small"
        checked={checked || false} 
        onChange={handleChange}
        />
    } label={label} />
    </FormGroup>
  );
}