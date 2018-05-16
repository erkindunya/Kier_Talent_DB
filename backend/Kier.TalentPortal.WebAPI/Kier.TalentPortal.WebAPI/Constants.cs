﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kier.TalentPortal.WebAPI
{
    public class Constants
    {
        public const string Talent_Record_Area_Head = "KTPAreaHead";
        public const string Talent_Record_Business_Risk = "KTPBusinessRisk";
        public const string Talent_Record_Business_Stream = "KTPBusinessStream";
        public const string Talent_Record_Business_Unit = "KTPBusinessUnit";
        public const string Talent_Record_Is_Current_Submission = "KTPCurrentSubmission";
        public const string Talent_Record_Development_Notes = "KTPDevelopmentNotes";
        public const string Talent_Record_Division = "KTPDivision";
        public const string Talent_Record_Employee_Id = "KTPEmployeeID";
        public const string Talent_Record_First_Development_Requirement = "KTPFirstDevelopmentRequirement";
        public const string Talent_Record_Flight_Risk = "KTPFlightRisk";
        public const string Talent_Record_Function = "KTPFunction";
        public const string Talent_Record_Grade = "KTPGrade";
        public const string Talent_Record_Location = "KTPLocation";
        public const string Talent_Record_Movement = "KTPMovementStatus";
        public const string Talent_Record_Performance = "KTPPerformanceRating";
        public const string Talent_Record_Position = "KTPPosition";
        public const string Talent_Record_Potential = "KTPPotentialRating";
        public const string Talent_Record_Second_Development_Requirement = "KTPSecondDevelopmentRequirement";
        public const string Talent_Record_Submission_Year = "KTPSubmissionYear";
        public const string Get_Talent_Record_By_EmployeeId_Query = @"<Where><Eq><FieldRef Name=""KTPEmployeeID""/><Value Type = ""Text"" >K11312</Value></Eq></Where><OrderBy><FieldRef Name=""KTPSubmissionYear"" Ascending=""False"" /></OrderBy>";



    }
}