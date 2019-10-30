#define _GNU_SOURCE
#include <stdio.h>
#include <string.h>
#include <assert.h>
#include <errno.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/sysinfo.h>
#include <sys/types.h>
#include <grp.h>
#include <sys/wait.h>


int main() {
	/*process information*/
	int p_id;
	char *p_user;
	p_user = (char *)malloc(10*sizeof(char));
	p_user = getlogin();
	
	p_id = getpid();

	char buf[0x100];
	snprintf(buf, sizeof(buf), "/proc/%d/cmdline", p_id);
	FILE *fp_info = fopen(buf, "r");
	char *command_line = NULL;
	char command[100];
        size_t l = 0;

	while(getline(&command_line, &l, fp_info) > 0){
		strcpy(command, command_line);
	}

	struct sysinfo sys_info;

 	int days, hours, mins, x = 1;

	system("clear");  
  	printf("\033[4;40m            CPU information                   \033[0;m \n");
	if(sysinfo(&sys_info) != 0)
	   perror("sysinfo");

	days = sys_info.uptime / 86400;
	hours = (sys_info.uptime / 3600) - (days * 24);
	mins = (sys_info.uptime / 60) - (days * 1440) - (hours * 60);

	/*tasks*/
	char total_task[0x100];
	snprintf(buf, sizeof(total_task), "/proc/%d/status", p_id);
	FILE *fp_total = fopen(buf, "r");
	char *total_line = NULL;
	char task[100];
	size_t i = 0;

	/*cpu information*/
        FILE *fp = fopen("/proc/cpuinfo", "r");
        assert(fp != NULL);
        size_t n = 0;
        char *line = NULL;
        while (getline(&line, &n, fp) > 0) {
		if( strstr(line, "processor") ){
			printf("%s", line);		
		}                

		if(strstr(line, "vendor_id")){
			printf("%s", line);
		}

		if(strstr(line, "cpu family")){
			printf("%s", line);
		}

		if ( strstr(line, "model name") || strstr(line, "cpu cores") ) {
                        printf("%s", line);
                }

		if( strstr(line, "cpu MHz") ){
			printf("%s\n", line);
		}

        }
        free(line);

	printf("\n\033[4;40m            Process Information:                   \033[0;m \n");

	printf("user: %s\n", p_user);
	printf("pid: %d\n", p_id);
	printf("command: %s\n", command);

	printf("\n\033[4;40m            System Statistics:                   \033[0;m \n");

	printf("System was booted since: %d days, %d hours, %d minutes, %ld seconds\n", days, hours, mins, sys_info.uptime % 60 );

	printf("the number of active tasks: %d\n", p_id);

	/*total processor*/
        unsigned int eax=11,ebx=0,ecx=1,edx=0;

	asm volatile("cpuid"
		: "=a" (eax),
		  "=b" (ebx),
		  "=c" (ecx),
		  "=d" (edx)
		: "0" (eax), "2" (ecx)
		: );

	printf("The total number of processes: %d\n",eax);


        fclose(fp);
	fclose(fp_info);
        return errno;
}
