(function executeRule(current, previous /*null when async*/) {

    gs.log('Business Rule started for record with USC 10-Digit ID: ' + current.u_usc_10_digit_id);

    // Check if the record is being inserted or updated
    if (current.operation() == 'insert' || current.operation() == 'update') {

        gs.log('Operation is insert or update for record with USC 10-Digit ID: ' + current.u_usc_10_digit_id);

        // Create GlideRecord object for the additional table (u_workday_new_hire)
        var additionalTableGR = new GlideRecord('u_workday_new_hire');

        // Set the query condition for the additional table (u_workday_new_hire)
        additionalTableGR.addQuery('u_usc_id', current.u_usc_10_digit_id); // Match against u_usc_id in u_workday_new_hire
        additionalTableGR.query();

        // Check if the additional table (u_workday_new_hire) record exists
        if (additionalTableGR.next()) {
            // If there is a match, update the fields in the target table (u_ldap_new_hires_for_order_guide)
			//current.u_manager = additionalTableGR.u_manager_name;
			current.u_manager = additionalTableGR.getDisplayValue('u_manager_name');
			current.u_hiring_manager = additionalTableGR.getDisplayValue('u_hiring_manager_name');
			current.u_position_id = additionalTableGR.u_position_id;
			current.u_position_title = additionalTableGR.u_position_title;
			current.u_business_title = additionalTableGR.u_business_title;
			current.u_is_supervisor = additionalTableGR.u_is_supervisor;
			current.u_time_type = additionalTableGR.u_time_type.replace('_', '-') + '-' + additionalTableGR.u_worker_type_id;
            gs.log('Manager field updated successfully for USC 10-Digit ID: ' + current.u_usc_10_digit_id);
        } else {
            gs.error('Record not found in additional table (u_workday_new_hire) for USC ID: ' + current.u_usc_10_digit_id);
        }
    }

    gs.log('Business Rule completed for record with USC 10-Digit ID: ' + current.u_usc_10_digit_id);


})(current, previous);

