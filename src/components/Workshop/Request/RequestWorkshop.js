import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { saveAllSkills } from '../../../store/reducers/SkillsReducers';
import { useDispatch, useSelector } from 'react-redux';
import { getSkills } from '../../../store/actions/AdminActions';
import { Autocomplete, TextField } from '@mui/material';
import { LoadingPage } from '../../Loading/Loading';

const RequestWorkshop = ({ open, onClose, handleRequest }) => {
    const [selectedSkill, setSelectedSkill] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const allSkills = useSelector((state) => state?.skills?.value?.allSkills);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const skills = await getSkills();
                dispatch(saveAllSkills(skills));
                setIsLoading(false);
            } catch (error) {
                console.error("Error : ", error);
                setIsLoading(false);
            }
        };
        if (open && isLoading) {
            fetchSkills();
        }
        if (open && allSkills) {
            setIsLoading(false);
        }
    })

    const handleSkillChange = (event, values) => {
        const value = values.pop()
        if (typeof (value) === 'object') {
            values.push(value);
            setSelectedSkill(values);
        } else {
            const inputText = value;
            console.log(inputText)
            if (inputText === undefined) {
                setSelectedSkill([]);
            } else if (inputText !== '' && !values.find((skill) => skill.skillName === inputText)) {
                setSelectedSkill([...values, { skillName: inputText }]);
            }
        }
    };

    const handleRequestWorkshop = () => {
        handleRequest(selectedSkill);
    };

    const handleCancel = () => {
        // Close the dialog without making the request
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ style: { minWidth: '300px' } }}>
            <DialogTitle automationId='wrkshp_req_title'>Request Workshop</DialogTitle>
            {(open && isLoading) ? (<LoadingPage />) : <DialogContent>
                <Autocomplete
                    multiple
                    id="selectedSkills"
                    componentName="selectedSkills"
                    options={allSkills}
                    getOptionLabel={(option) => option.skillName}
                    getOptionSelected={(option, value) => option.skillId === value.skillId}
                    value={selectedSkill}
                    freeSolo
                    onChange={(e, newValue) => {
                        handleSkillChange(e, newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            inputProps={{ automationId: 'req_wrkshp_skills_field' }}
                            variant="standard"
                            {...params}
                            label="Skills"
                            fullWidth
                        />
                    )}
                />
            </DialogContent>
            }
            <DialogActions>
                <Button automationId = "req_wrkshp_request_btn" onClick={handleRequestWorkshop} color="primary">
                    Request
                </Button>
                <Button automationId = "req_wrkshp_cancel_btn" onClick={handleCancel} color="primary">
                    Cancel
                </Button>

            </DialogActions>
        </Dialog>
    );
};

export default RequestWorkshop;
